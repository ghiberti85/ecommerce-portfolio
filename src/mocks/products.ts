// src/mocks/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Novo suporte para múltiplas imagens
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone XYZ',
    description: 'Um smartphone avançado com câmera de alta resolução.',
    price: 999.99,
    image: 'https://picsum.photos/300/200?random=1',
    images: [
      'https://picsum.photos/300/200?random=1',
      'https://picsum.photos/300/200?random=11',
      'https://picsum.photos/300/200?random=12'
    ],
    category: 'Eletrônicos',
  },
  {
    id: '2',
    name: 'Laptop ABC',
    description: 'Laptop leve e potente para profissionais.',
    price: 1299.99,
    image: 'https://picsum.photos/300/200?random=2',
    images: [
      'https://picsum.photos/300/200?random=2',
      'https://picsum.photos/300/200?random=13',
      'https://picsum.photos/300/200?random=14'
    ],
    category: 'Eletrônicos',
  },
  {
    id: '3',
    name: 'Fones de Ouvido QWE',
    description: 'Fones de ouvido sem fio com cancelamento de ruído.',
    price: 199.99,
    image: 'https://picsum.photos/300/200?random=3',
    images: [
      'https://picsum.photos/300/200?random=3',
      'https://picsum.photos/300/200?random=15'
    ],
    category: 'Acessórios',
  },
  {
    id: '4',
    name: 'Camiseta ERT',
    description: 'Camiseta de algodão com design exclusivo.',
    price: 19.99,
    image: 'https://picsum.photos/300/200?random=4',
    category: 'Roupas',
  },
  {
    id: '5',
    name: 'Livro ZXC',
    description: 'Livro de ficção científica best-seller.',
    price: 9.99,
    image: 'https://picsum.photos/300/200?random=5',
    category: 'Livros',
  },
  {
    id: '6',
    name: 'Tablet VBN',
    description: 'Tablet com tela de alta resolução e armazenamento expansível.',
    price: 299.99,
    image: 'https://picsum.photos/300/200?random=6',
    images: [
      'https://picsum.photos/300/200?random=6',
      'https://picsum.photos/300/200?random=16'
    ],
    category: 'Eletrônicos',
  },
  {
    id: '7',
    name: 'Mochila FGH',
    description: 'Mochila resistente à água com compartimento para laptop.',
    price: 49.99,
    image: 'https://picsum.photos/300/200?random=7',
    category: 'Acessórios',
  },
  {
    id: '8',
    name: 'Calça JKL',
    description: 'Calça jeans de alta qualidade e confortável.',
    price: 39.99,
    image: 'https://picsum.photos/300/200?random=8',
    category: 'Roupas',
  },
  {
    id: '9',
    name: 'Relógio UIO',
    description: 'Relógio de pulso elegante com pulseira de couro.',
    price: 79.99,
    image: 'https://picsum.photos/300/200?random=9',
    category: 'Acessórios',
  },
  {
    id: '10',
    name: 'Câmera RTY',
    description: 'Câmera digital compacta com zoom óptico de 10x.',
    price: 199.99,
    image: 'https://picsum.photos/300/200?random=10',
    category: 'Eletrônicos',
  },
  {
    id: '11',
    name: 'Óculos de Sol ASD',
    description: 'Óculos de sol com proteção UV e lentes polarizadas.',
    price: 59.99,
    image: 'https://picsum.photos/300/200?random=11',
    category: 'Acessórios',
  },
  {
    id: '12',
    name: 'Monitor UltraWide',
    description: 'Monitor de alta definição 34" para produtividade máxima.',
    price: 799.99,
    image: 'https://picsum.photos/300/200?random=12',
    category: 'Eletrônicos',
  },
  {
    id: '13',
    name: 'Cadeira Gamer Pro',
    description: 'Cadeira ergonômica para longas horas de conforto.',
    price: 599.99,
    image: 'https://picsum.photos/300/200?random=13',
    category: 'Acessórios',
  },
  {
    id: '14',
    name: 'Tênis Esportivo',
    description: 'Tênis confortável para caminhadas e corridas.',
    price: 149.99,
    image: 'https://picsum.photos/300/200?random=14',
    category: 'Roupas',
  },
  {
    id: '15',
    name: 'Echo Smart Speaker',
    description: 'Alto-falante inteligente com assistente de voz integrado.',
    price: 349.99,
    image: 'https://picsum.photos/300/200?random=15',
    category: 'Eletrônicos',
  }
];

export const categories: string[] = ['Eletrônicos', 'Acessórios', 'Roupas', 'Livros'];
