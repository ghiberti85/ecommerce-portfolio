// src/components/CategoryFilter.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { normalizeString } from '../utils/normalizeString';

const categories = ['Todos', 'Eletrônicos', 'Roupas', 'Acessórios', 'Casa', 'Esportes'];

export const CategoryFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (category: string) => {
    const categorySlug = category === 'Todos' ? '/' : `/category/${normalizeString(category)}`;
    router.push(categorySlug);
  };

  return (
    <div className="flex justify-center gap-4 overflow-x-auto px-0 pt-16 pb-8 m-auto scrollbar-hide">
      {categories.map((category) => {
        const categorySlug = category === 'Todos' ? '/' : `/category/${normalizeString(category)}`;
        const isActive = pathname === categorySlug;

        return (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-md transition ${
              isActive ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
