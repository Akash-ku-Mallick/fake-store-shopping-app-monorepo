import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@shared/api/productsApi";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <img src={product.image} alt={product.title} className="h-60 mx-auto" />
      <h1 className="text-xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-blue-600 font-bold text-lg mt-2">${product.price}</p>
    </div>
  );
}
