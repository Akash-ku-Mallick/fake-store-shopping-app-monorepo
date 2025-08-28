import { useGetProductsQuery } from '@shared/api/productsApi';
import { useScrollTracker } from '@shared/hooks/useScrollTracker';
import ProductCard from '@shared/components/ui/cards/product';
import NoProducts from '@shared/components/ui/messages/noProducts';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get('pageNo') ?? '0');

  // filters
  const query = searchParams.get('query') ?? undefined;
  const categoryIdQuery = searchParams.get('categoryId') ?? undefined;
  const categoryId = categoryIdQuery ? parseInt(categoryIdQuery) : undefined;

  // API hook
  const { data, isLoading, isFetching, isUninitialized } = useGetProductsQuery(
    {
      offset: pageNo,
      limit: 8,
      title: query,
      categoryId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // 👇 handles infinite scroll pagination
  function triggerNextPage() {
    if (isFetching || isLoading) return;

    const newParams = new URLSearchParams(searchParams);
    newParams.set('pageNo', String(pageNo + 1));
    setSearchParams(newParams);
  }

  // track scroll
  useScrollTracker({
    threshold: 100,
    onReachBottom: () => triggerNextPage(),
  });

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-lg">
      {data && data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-screen">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : isLoading || isFetching || isUninitialized ? (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-lg border border-yellow-200 p-3 bg-blue-100 h-48 shadow-sm"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <NoProducts />
        </div>
      )}
    </div>
  );
};

export default Products;
