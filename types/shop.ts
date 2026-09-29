export type ShopCategory = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
};

export type ShopProduct = {
  _id: string;
  title: string;
  slug: string;
  sku?: string;
  excerpt?: string;
  description?: string;
  status: string;
  featured?: boolean;
  sortOrder?: number;
  categoryIds?: ShopCategory[] | string[];
  price: number;
  salePrice?: number;
  unitPrice?: number;
  listPrice?: number;
  currency?: string;
  thumbnailUrl: string;
  gallery?: string[];
  trackInventory?: boolean;
  stockQuantity?: number;
  lowStockThreshold?: number;
};

export type ShopCartLine = {
  productId: string;
  slug: string;
  title: string;
  thumbnailUrl: string;
  unitPrice: number;
  quantity: number;
  lineTotal?: number;
  purchasable?: boolean;
  trackInventory?: boolean;
  stockQuantity?: number;
  maxQuantity?: number;
  issues?: string[];
};

export type ShopCartIssue = {
  productId: string;
  code: string;
  reasons?: string[];
  quantity?: number;
};

export type ShopCartPayload = {
  items: ShopCartLine[];
  issues: ShopCartIssue[];
  subtotal: number;
  shippingFee: number;
  total: number;
  valid: boolean;
  itemCount: number;
};

export type ShopShippingAddress = {
  fullName: string;
  phone: string;
  governorate: string;
  city: string;
  area: string;
  street: string;
  building?: string;
  notes?: string;
};

export type ShopOrderLine = {
  productId: string;
  sku?: string;
  title: string;
  thumbnailUrl?: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type ShopOrder = {
  _id: string;
  orderNumber: string;
  items: ShopOrderLine[];
  subtotal: number;
  shippingFee: number;
  total: number;
  currency: string;
  shippingAddress: ShopShippingAddress;
  paymentStatus: string;
  fulfillmentStatus: string;
  paidAt?: string | null;
  createdAt: string;
};

export type ShopProductsResponse = {
  products: ShopProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  shippingFee?: number;
};
