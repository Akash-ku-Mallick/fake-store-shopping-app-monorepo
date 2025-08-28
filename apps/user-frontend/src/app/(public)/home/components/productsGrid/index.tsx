import { useGetProductsQuery } from "@shared/api/productsApi";
import Spinner from "@shared/components/ui/loader/spinner"
import { useSearchParams } from "react-router-dom";
import ProductCard from '@shared/components/ui/cards/product';

const ProductsGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const offset = parseInt(searchParams.get('offset') ?? '0')
  const { data: products, isLoading, error } = useGetProductsQuery({
    limit: 8,
    offset: offset
  }, {
    refetchOnMountOrArgChange: true
  });

  function onScrollToBottomNextPage() {
    if(isLoading) return;
    const nextPage = offset + 1;
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('offset', nextPage.toString());
    setSearchParams(updatedParams, { replace: true });
  }

  return (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products?.map((product) => (
        <ProductCard product={product}/>
      ))}
      </div>
      {
        isLoading ? <><Spinner /></>
        : error && <>
        {/* <Errror Component /> */}
        </>
      }
    </div>
  );
}

export default ProductsGrid
