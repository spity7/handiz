import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import CartView from "@/components/shop/CartView";
import { fetchShopProducts } from "@/lib/shop";

export const metadata = { title: "Cart | Handiz Shop" };

export default async function ShopCartPage() {
  const { shippingFee } = await fetchShopProducts({ limit: 1 });

  return (
    <>
      <Header1 />
      <div className="main-content">
        <CartView shippingFee={shippingFee ?? 0} />
      </div>
      <Footer1 />
    </>
  );
}
