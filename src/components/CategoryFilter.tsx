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
    <div className="bg-gray-900 py-8">
      {/* No mobile: alinhado à esquerda, com scroll horizontal funcional */}
      <div className="w-full overflow-x-auto sm:flex sm:justify-center scrollbar-hide touch-pan-x">
        {/* 🔹 Reduzi ainda mais a margem da esquerda no mobile para alinhar melhor */}
        <div className="flex gap-3 sm:gap-6 flex-nowrap px-0.5 sm:px-0 min-w-max">
          {categories.map((category) => {
            const categorySlug = category === 'Todos' ? '/' : `/category/${normalizeString(category)}`;
            const isActive = pathname === categorySlug;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 text-sm md:text-base rounded-lg transition-all duration-300 ${
                  isActive ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Esconde a barra de rolagem e garante scroll suave no mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .touch-pan-x {
          touch-action: pan-x;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
};
