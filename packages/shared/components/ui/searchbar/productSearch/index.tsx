import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  query: yup.string().required("Search is required"),
});

const ProductSearch = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ query: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { query: string }) => {
    navigate(`/products?query=${encodeURI(data.query.trim())}`)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      <div
        className={`flex items-center rounded-xl border transition 
        focus-within:shadow-md px-3 py-2 ${
          errors.query ? "border-red-500" : "border-gray-300"
        }`}
      >
        <input
          type="text"
          placeholder="Search products..."
          {...register("query")}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-2 text-gray-600 hover:text-gray-900 transition"
        >
          <Icon icon="mdi:search" width="22" height="22" />
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;
