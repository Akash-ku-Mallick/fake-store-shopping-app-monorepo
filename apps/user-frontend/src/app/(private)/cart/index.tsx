import { useSelector } from "react-redux";
import { useGetCartByUserQuery } from "@shared/api/cartsApi";
import type { RootState } from "apps/user-frontend/src/store/type";

export default function Cart() {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: cart, isLoading } = useGetCartByUserQuery(user?.id ?? 1); // fallback id for demo

  if (isLoading) return <p>Loading...</p>;
  if (!cart) return <p>No cart found</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart?.map((item: any, idx: number) => (
        <div key={idx} className="flex justify-between border-b py-2">
          <span>Product ID: {item.productId}</span>
          <span>Qty: {item.quantity}</span>
        </div>
      ))}
    </div>
  );
}
