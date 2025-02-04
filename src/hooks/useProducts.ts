// src/hooks/useProducts.ts

import useSWR from 'swr';
import { Product, products, categories } from '../mocks/products';

const fetcher = (key: string) => {
  // Simula um atraso de rede
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      if (key === 'products') {
        resolve(products);
      } else {
        resolve([]);
      }
    }, 500);
  });
};

export function useProducts() {
  const { data, error } = useSWR<Product[]>('products', fetcher);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCategories() {
  return categories;
}