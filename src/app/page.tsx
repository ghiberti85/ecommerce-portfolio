// src/app/page.tsx
import { ProductListWrapper } from '../components/product/ProductListWrapper';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold my-6 mx-auto">Nossos Produtos</h1>
      <ProductListWrapper />
    </main>
  );
}