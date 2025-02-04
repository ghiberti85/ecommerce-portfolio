// src/components/product/ProductListWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import('./ProductList').then(mod => mod.ProductList), {
  loading: () => <p>Carregando produtos...</p>,
});

export function ProductListWrapper() {
  return <ProductList />;
}