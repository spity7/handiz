import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import CheckoutView from "@/components/shop/CheckoutView";
import { fetchShopProducts } from "@/lib/shop";

export const metadata = { title: "Checkout | Handiz Shop" };

export default async function ShopCheckoutPage() {
  const { shippingFee } = await fetchShopProducts({ limit: 1 });

  return (
    <>
      <Header1 />
      <div className="main-content">
        <CheckoutView shippingFee={shippingFee ?? 0} />
      </div>
      <Footer1 />
    </>
  );
}
