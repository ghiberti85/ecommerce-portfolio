// src/components/CategoryFilter.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = ['Todos', 'Eletrônicos', 'Roupas', 'Acessórios', 'Casa', 'Esportes'];

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const router = useRouter();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    router.push(category === 'Todos' ? '/' : `/category/${category.toLowerCase()}`);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto p-4 bg-gray-100 rounded-lg">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-md transition ${
            selectedCategory === category
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
