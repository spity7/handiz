import type {
  ShopCategory,
  ShopOrder,
  ShopProduct,
  ShopProductsResponse,
  ShopShippingAddress,
} from "@/types/shop";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5016/api/v1/";

export async function fetchShopCategories(): Promise<ShopCategory[]> {
  try {
    const res = await fetch(`${API_BASE_URL}shop/categories`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.categories ?? [];
  } catch {
    return [];
  }
}

export async function fetchShopProducts(
  params?: {
    page?: number;
    limit?: number;
    q?: string;
    category?: string;
    sort?: string;
    featured?: boolean;
  },
  init?: RequestInit,
): Promise<ShopProductsResponse> {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.q) search.set("q", params.q);
  if (params?.category) search.set("category", params.category);
  if (params?.sort) search.set("sort", params.sort);
  if (params?.featured) search.set("featured", "true");

  const qs = search.toString();
  const url = `${API_BASE_URL}shop/products${qs ? `?${qs}` : ""}`;

  try {
    const res = await fetch(url, { cache: "no-store", ...init });
    if (!res.ok) {
      return {
        products: [],
        pagination: { page: 1, limit: 12, total: 0, pages: 0 },
      };
    }
    return await res.json();
  } catch (error) {
    if (
      init?.signal?.aborted ||
      (error instanceof DOMException && error.name === "AbortError")
    ) {
      throw error;
    }
    return {
      products: [],
      pagination: { page: 1, limit: 12, total: 0, pages: 0 },
    };
  }
}

export async function fetchShopProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}shop/products/slug/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data as {
    product: ShopProduct;
    purchasable: boolean;
    shippingFee: number;
  };
}

export async function fetchMyShopOrders(page = 1) {
  const res = await fetch(
    `${API_BASE_URL}shop/orders/me?page=${page}&limit=10`,
    { credentials: "include", cache: "no-store" },
  );
  if (!res.ok)
    return {
      orders: [],
      pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    };
  return await res.json();
}

export async function fetchShopOrderById(id: string) {
  const res = await fetch(`${API_BASE_URL}shop/orders/${id}`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.order as ShopOrder;
}
