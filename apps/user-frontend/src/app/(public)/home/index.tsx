import { useGetProductsQuery } from "@shared/api/productsApi";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products?.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="border rounded p-2 hover:shadow"
        >
          <img src={product.image} alt={product.title} className="h-40 mx-auto" />
          <h3 className="mt-2 text-sm font-medium">{product.title}</h3>
          <p className="text-blue-600 font-bold">${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

export default Home
