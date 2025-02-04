// src/mocks/products.ts

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }
  
  export const products: Product[] = [
    {
      id: '1',
      name: 'Smartphone XYZ',
      description: 'Um smartphone avançado com câmera de alta resolução.',
      price: 999.99,
      image: '/images/smartphone.jpg',
      category: 'Eletrônicos',
    },
    {
      id: '2',
      name: 'Laptop ABC',
      description: 'Laptop leve e potente para profissionais.',
      price: 1299.99,
      image: '/images/laptop.jpg',
      category: 'Eletrônicos',
    },
    {
      id: '3',
      name: 'Fones de Ouvido QWE',
      description: 'Fones de ouvido sem fio com cancelamento de ruído.',
      price: 199.99,
      image: '/images/headphones.jpg',
      category: 'Acessórios',
    },
    {
      id: '4',
      name: 'Camiseta ERT',
      description: 'Camiseta de algodão com design exclusivo.',
      price: 19.99,
      image: '/images/shirt.jpg',
      category: 'Roupas',
    },
    {
      id: '5',
      name: 'Livro ZXC',
      description: 'Livro de ficção científica best-seller.',
      price: 9.99,
      image: '/images/book.jpg',
      category: 'Livros',
    },
    {
        id: '6',
        name: 'Tablet VBN',
        description: 'Tablet com tela de alta resolução e armazenamento expansível.',
        price: 299.99,
        image: '/images/tablet.jpg',
        category: 'Eletrônicos',
    },
    {
        id: '7',
        name: 'Mochila FGH',
        description: 'Mochila resistente à água com compartimento para laptop.',
        price: 49.99,
        image: '/images/backpack.jpg',
        category: 'Acessórios',
    },
    {
        id: '8',
        name: 'Calça JKL',
        description: 'Calça jeans de alta qualidade e confortável.',
        price: 39.99,
        image: '/images/pants.jpg',
        category: 'Roupas',
    },
    {
        id: '9',
        name: 'Relógio UIO',
        description: 'Relógio de pulso elegante com pulseira de couro.',
        price: 79.99,
        image: '/images/watch.jpg',
        category: 'Acessórios',
    },
    {
        id: '10',
        name: 'Câmera RTY',
        description: 'Câmera digital compacta com zoom óptico de 10x.',
        price: 199.99,
        image: '/images/camera.jpg',
        category: 'Eletrônicos',
    },
    {
        id: '11',
        name: 'Óculos de Sol ASD',
        description: 'Óculos de sol com proteção UV e lentes polarizadas.',
        price: 59.99,
        image: '/images/sunglasses.jpg',
        category: 'Acessórios',
    },
  ];
  
  export const categories: string[] = ['Eletrônicos', 'Acessórios', 'Roupas', 'Livros'];