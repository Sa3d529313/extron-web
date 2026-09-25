import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ key: p.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const product = products.find((p) => p.key === key);
  return { title: product ? `${product.ar} — EXTRON` : "EXTRON" };
}

export default async function ProductPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const index = products.findIndex((p) => p.key === key);

  return (
    <>
      <Nav forceDark />
      <main className="min-h-screen bg-white">
        <ProductDetail initialIndex={index === -1 ? 0 : index} />
      </main>
      <Footer />
    </>
  );
}
