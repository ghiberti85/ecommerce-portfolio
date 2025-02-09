// src/app/page.tsx
import { ProductListWrapper } from '../components/product/ProductListWrapper';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-6 mx-auto mb-0">Nossos Produtos</h1>
      <ProductListWrapper />
    </main>
  );
}