"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fetchCurrentUser } from "@/lib/auth";
import {
  addServerCartItem,
  clearServerCart,
  fetchServerCart,
  mergeServerCart,
  removeServerCartItem,
  updateServerCartItem,
} from "@/lib/shopCart";
import type { ShopCartLine, ShopCartPayload, ShopProduct } from "@/types/shop";

const STORAGE_KEY = "handiz_shop_cart_v1";

type ShopCartContextValue = {
  lines: ShopCartLine[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  total: number;
  cartValid: boolean;
  cartIssues: ShopCartPayload["issues"];
  syncing: boolean;
  isAuthenticated: boolean;
  addProduct: (product: ShopProduct, quantity?: number) => Promise<void>;
  setQuantity: (productId: string, quantity: number) => Promise<void>;
  removeLine: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const ShopCartContext = createContext<ShopCartContextValue | null>(null);

function readGuestStorage(): ShopCartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGuestStorage(lines: ShopCartLine[]) {
  if (typeof window === "undefined") return;
  if (lines.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }
}

function applyPayload(
  payload: ShopCartPayload,
  setters: {
    setLines: (l: ShopCartLine[]) => void;
    setSubtotal: (n: number) => void;
    setShippingFee: (n: number) => void;
    setTotal: (n: number) => void;
    setCartValid: (v: boolean) => void;
    setCartIssues: (i: ShopCartPayload["issues"]) => void;
  },
) {
  setters.setLines(payload.items);
  setters.setSubtotal(payload.subtotal);
  setters.setShippingFee(payload.shippingFee);
  setters.setTotal(payload.total);
  setters.setCartValid(payload.valid);
  setters.setCartIssues(payload.issues || []);
  writeGuestStorage([]);
}

export function ShopCartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<ShopCartLine[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartValid, setCartValid] = useState(true);
  const [cartIssues, setCartIssues] = useState<ShopCartPayload["issues"]>([]);
  const [syncing, setSyncing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const mergeDoneRef = useRef(false);

  const setters = useMemo(
    () => ({
      setLines,
      setSubtotal,
      setShippingFee,
      setTotal,
      setCartValid,
      setCartIssues,
    }),
    [],
  );

  const refreshCart = useCallback(async () => {
    const user = await fetchCurrentUser();
    setIsAuthenticated(!!user);
    if (!user) {
      mergeDoneRef.current = false;
      const guest = readGuestStorage();
      setLines(guest);
      setSubtotal(guest.reduce((s, l) => s + l.unitPrice * l.quantity, 0));
      setCartValid(guest.length > 0);
      setCartIssues([]);
      return;
    }

    setSyncing(true);
    try {
      if (!mergeDoneRef.current) {
        const guest = readGuestStorage();
        if (guest.length > 0) {
          const payload = await mergeServerCart(
            guest.map((l) => ({
              productId: l.productId,
              quantity: l.quantity,
            })),
          );
          mergeDoneRef.current = true;
          applyPayload(payload, setters);
          return;
        }
        mergeDoneRef.current = true;
      }
      const payload = await fetchServerCart();
      applyPayload(payload, setters);
    } catch {
      const guest = readGuestStorage();
      setLines(guest);
    } finally {
      setSyncing(false);
    }
  }, [setters]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  useEffect(() => {
    const onFocus = () => {
      refreshCart();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [refreshCart]);

  const addProduct = useCallback(
    async (product: ShopProduct, quantity = 1) => {
      const user = await fetchCurrentUser();
      if (user) {
        setSyncing(true);
        try {
          const payload = await addServerCartItem(product._id, quantity);
          applyPayload(payload, setters);
        } finally {
          setSyncing(false);
        }
        return;
      }

      const unitPrice =
        Number(product.unitPrice ?? product.salePrice ?? product.price) || 0;
      const qty = Math.max(1, quantity);
      setLines((prev) => {
        const existing = prev.find((l) => l.productId === product._id);
        let next: ShopCartLine[];
        if (existing) {
          next = prev.map((l) =>
            l.productId === product._id
              ? { ...l, quantity: l.quantity + qty }
              : l,
          );
        } else {
          next = [
            ...prev,
            {
              productId: product._id,
              slug: product.slug,
              title: product.title,
              thumbnailUrl: product.thumbnailUrl,
              unitPrice,
              quantity: qty,
            },
          ];
        }
        writeGuestStorage(next);
        return next;
      });
    },
    [setters],
  );

  const setQuantity = useCallback(
    async (productId: string, quantity: number) => {
      const user = await fetchCurrentUser();
      if (user) {
        setSyncing(true);
        try {
          const payload = await updateServerCartItem(productId, quantity);
          applyPayload(payload, setters);
        } finally {
          setSyncing(false);
        }
        return;
      }

      const qty = Math.max(0, quantity);
      setLines((prev) => {
        const next =
          qty === 0
            ? prev.filter((l) => l.productId !== productId)
            : prev.map((l) =>
                l.productId === productId ? { ...l, quantity: qty } : l,
              );
        writeGuestStorage(next);
        return next;
      });
    },
    [setters],
  );

  const removeLine = useCallback(
    async (productId: string) => {
      const user = await fetchCurrentUser();
      if (user) {
        setSyncing(true);
        try {
          const payload = await removeServerCartItem(productId);
          applyPayload(payload, setters);
        } finally {
          setSyncing(false);
        }
        return;
      }

      setLines((prev) => {
        const next = prev.filter((l) => l.productId !== productId);
        writeGuestStorage(next);
        return next;
      });
    },
    [setters],
  );

  const clearCart = useCallback(async () => {
    const user = await fetchCurrentUser();
    if (user) {
      setSyncing(true);
      try {
        const payload = await clearServerCart();
        applyPayload(payload, setters);
      } finally {
        setSyncing(false);
      }
      return;
    }
    setLines([]);
    writeGuestStorage([]);
  }, [setters]);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotal,
      shippingFee,
      total,
      cartValid,
      cartIssues,
      syncing,
      isAuthenticated,
      addProduct,
      setQuantity,
      removeLine,
      clearCart,
      refreshCart,
    }),
    [
      lines,
      itemCount,
      subtotal,
      shippingFee,
      total,
      cartValid,
      cartIssues,
      syncing,
      isAuthenticated,
      addProduct,
      setQuantity,
      removeLine,
      clearCart,
      refreshCart,
    ],
  );

  return (
    <ShopCartContext.Provider value={value}>
      {children}
    </ShopCartContext.Provider>
  );
}

export function useShopCart() {
  const ctx = useContext(ShopCartContext);
  if (!ctx) {
    throw new Error("useShopCart must be used within ShopCartProvider");
  }
  return ctx;
}
