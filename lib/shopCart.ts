import type { ShopCartPayload, ShopShippingAddress } from "@/types/shop";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

async function parseJson(res: Response) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Cart request failed");
  }
  return data;
}

export async function fetchServerCart(): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart`, {
      credentials: "include",
      cache: "no-store",
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function mergeServerCart(
  items: { productId: string; quantity: number }[],
): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart/merge`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function addServerCartItem(
  productId: string,
  quantity: number,
): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart/items`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function updateServerCartItem(
  productId: string,
  quantity: number,
): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart/items/${productId}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function removeServerCartItem(
  productId: string,
): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart/items/${productId}`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function clearServerCart(): Promise<ShopCartPayload> {
  const data = await parseJson(
    await fetch(`${API_BASE_URL}shop/cart`, {
      method: "DELETE",
      credentials: "include",
    }),
  );
  return data.cart as ShopCartPayload;
}

export async function validateServerCart(): Promise<{
  valid: boolean;
  cart: ShopCartPayload;
  message?: string;
}> {
  const res = await fetch(`${API_BASE_URL}shop/cart/validate`, {
    method: "POST",
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Validation failed");
  }
  return {
    valid: Boolean(data.valid),
    cart: data.cart as ShopCartPayload,
    message: data.message,
  };
}

export async function createShopCheckout(shippingAddress: ShopShippingAddress) {
  const res = await fetch(`${API_BASE_URL}shop/checkout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shippingAddress }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Checkout failed");
  }
  return data as { url: string; orderId: string; orderNumber: string };
}
