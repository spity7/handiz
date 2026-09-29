import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ProductDetailView from "@/components/shop/ProductDetailView";
import { fetchShopProductBySlug } from "@/lib/shop";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await fetchShopProductBySlug(slug);
  if (!data?.product) return { title: "Product | Handiz Shop" };
  return {
    title: `${data.product.title} | Handiz Shop`,
    description: data.product.excerpt || data.product.title,
  };
}

export default async function ShopProductPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchShopProductBySlug(slug);
  if (!data?.product) notFound();

  const { product, purchasable, shippingFee } = data;
  const price = product.unitPrice ?? product.price;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [product.thumbnailUrl, ...(product.gallery || [])],
    description: product.excerpt || product.title,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: price,
      availability: purchasable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header1 />
      <div className="main-content">
        <ProductDetailView
          product={product}
          purchasable={purchasable}
          shippingFee={shippingFee}
        />
      </div>
      <Footer1 />
    </>
  );
}
