import type { ShopProduct } from "@/types/shop";

const roundCurrency = (amount: number) => Math.round(amount * 100) / 100;

export type ShopPriceDisplay = {
  primaryLabel: string;
  compareAt: number | null;
};

export function getShopPriceDisplay(product: ShopProduct): ShopPriceDisplay {
  const list = Number(product.listPrice ?? product.price) || 0;
  const unit =
    Number(product.unitPrice ?? product.salePrice ?? product.price) || 0;

  if (unit > 0 && unit < list) {
    return {
      primaryLabel: `$${unit.toFixed(2)}`,
      compareAt: list,
    };
  }

  return {
    primaryLabel: `$${roundCurrency(unit || list).toFixed(2)}`,
    compareAt: null,
  };
}

export function getCartSubtotal(
  lines: { unitPrice: number; quantity: number }[],
) {
  return roundCurrency(
    lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0),
  );
}
