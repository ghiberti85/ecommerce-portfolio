import { useEffect, useState } from "react";
import { fetchMockData } from "./services/dataService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchMockData("products").then((data) => {
      if (data) {
        setProducts(
          data.map((product: Product) => ({
            ...product,
            image: product.image?.startsWith("/images/")
              ? product.image
              : `https://picsum.photos/200/300?random=${product.id}`,
          }))
        );
      }
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Produtos</h1>
      <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <li key={product.id} className="p-4 border rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
              onError={(e) => (e.currentTarget.src = `https://placehold.co/200x300?text=Imagem+Indisponível`)}
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <strong className="text-green-600 block mt-2">R$ {product.price.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
