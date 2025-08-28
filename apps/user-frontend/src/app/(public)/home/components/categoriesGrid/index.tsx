import { useGetCategoriesQuery } from "@shared/api/categoriesApi";
import { useNavigate } from "react-router-dom";

const CategoriesGrid = () => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const navigate = useNavigate();

  function triggerCatagoryClick(categoryId: number) {
    navigate(`/products?categoryId=${categoryId}`);
  }

  if (isLoading) return <p className="text-center">Loading categories...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load categories</p>;

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 p-6">
      {categories?.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center transition duration-300 cursor-pointer group"
          onClick={() => triggerCatagoryClick(cat.id)} >
          <img
            src={cat.image}
            alt={cat.name}
            className="w-20 h-20 object-cover rounded-full mb-3 border-2 border-blue-200 dark:border-yellow-300 group-hover:scale-95 group-hover:animate-bounce"
          />
          <p
            className="font-medium text-gray-900 dark:text-gray-700 group-hover:scale-110 transition-transform" >
            {cat.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoriesGrid;
