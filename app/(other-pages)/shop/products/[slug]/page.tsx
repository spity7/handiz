import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import ProductDetailView from "@/components/shop/ProductDetailView";
import ProductCard from "@/components/shop/ProductCard";
import { fetchShopProductBySlug, fetchShopProducts } from "@/lib/shop";
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

  const firstCategory = product.categoryIds?.[0];
  const categorySlug =
    firstCategory && typeof firstCategory !== "string"
      ? firstCategory.slug
      : undefined;
  const related = (
    await fetchShopProducts({ category: categorySlug, limit: 5 })
  ).products
    .filter((p) => p._id !== product._id)
    .slice(0, 4);

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
        {related.length > 0 && (
          <section className="shop-pdp-related tf-container tf-spacing-1">
            <h2 className="shop-pdp-related__title">You may also like</h2>
            <div className="tf-grid-layout tf-col-2 lg-col-4 md-col-3 sm-col-2 gap30">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer1 />
    </>
  );
}
