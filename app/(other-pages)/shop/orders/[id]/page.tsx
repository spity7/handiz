import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import OrderDetailView from "@/components/shop/OrderDetailView";
import { fetchShopOrderById } from "@/lib/shop";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function ShopOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await fetchShopOrderById(id);
  if (!order) notFound();

  return (
    <>
      <Header1 />
      <div className="main-content">
        <OrderDetailView order={order} />
      </div>
      <Footer1 />
    </>
  );
}
