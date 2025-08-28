import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@shared/api/productsApi";
import { useCurrencyConverter } from "@shared/hooks/useCurrencyConverter"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import ProductsImageSwiper from "@shared/components/ui/swipers/productPage"

interface ReviewForm {
  review: string;
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(Number(id));
  const { convert, loading } = useCurrencyConverter("INR");

  // ---------- Form Setup ----------
  const schema = yup.object({
    review: yup
      .string()
      .required("Review is required")
      .max(300, "Max 300 characters allowed"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ReviewForm) => {
    console.log("Review submitted:", data.review);
    reset();
  };

  // ---------- Stub Actions ----------
  const addToCart = () => { };
  const buyNow = () => { };

  // ---------- Skeleton Loader ----------
  if (isLoading)
    return (
      <div className="max-w-2xl mx-auto animate-pulse space-y-4">
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      </div>
    );

  // ---------- Product Not Found ----------
  if (!product)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-500 dark:text-gray-400">
        <Icon icon="mdi:alert-circle-outline" className="text-6xl mb-4" />
        <p className="text-lg">Product not available</p>
      </div>
    );

  const price = convert(product.price);
  return (
    <div className="mx-auto md:mx-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* ---------- Action button & Slider ---------- */}
        <div className="w-full md:w-1/3">
        {/* ---------- Image Slider ---------- */}
          <ProductsImageSwiper images={product.images} productTitle={product.title} />
          {/* ---------- Actions ---------- */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 flex items-center justify-center bg-yellow-400 dark:bg-yellow-500 hover:bg-yellow-300 dark:hover:bg-amber-400 font-semibold rounded-lg transition-all group"
            >
              <Icon icon={'carbon:shopping-cart-plus'} className=" text-gray-200 group-hover:text-gray-50 group-hover:scale-120" />
            </button>
            <button
              onClick={buyNow}
              className="flex-2 bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* ---------- Product Info ---------- */}
        <div className="w-full md:w-2/3 p-4 bg-gray-50 text-gray-900 rounded-lg shadow">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-800 dark:text-gray-800 mt-2">{product.description}</p>
          {loading ? <>...</>
            : <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mt-2">
              {price.amount} /-
            </p>}

        </div>
      </div>

      {/* ---------- Reviews Section ---------- */}
      <div className="p-4 bg-gray-50 text-gray-900 rounded-lg shadow space-y-4">
        <h2 className="font-semibold text-lg">Reviews</h2>
        <p className="text-gray-500 dark:text-gray-900">No reviews yet.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <textarea
            {...register("review")}
            placeholder="Write your review..."
            className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white  text-gray-900 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-yellow-300 transition resize-none"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
