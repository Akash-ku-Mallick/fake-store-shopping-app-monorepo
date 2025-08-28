import { Product } from '@shared/api/productsApi/type'
import {useCurrencyConverter} from '@shared/hooks/useCurrencyConverter'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

interface props {
  product: Product
}

const ProductCard: FC<props> = ({ product }) => {
  const { convert, loading } = useCurrencyConverter("INR");
  const price = convert(product.price); 
  return (
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="rounded-xl border border-yellow-50 p-3 shadow-md bg-gradient-to-br from-gray-50 to-yellow-50 dark:from-gray-50 dark:to-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Product Image Slider */}
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={8}
        slidesPerView={1}
        className="w-full h-40 rounded-lg overflow-hidden"
      >
        {product.images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`${product.title}-${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-800">
          {product.title}
        </h3>
        {loading ? <>...</>
        :<p className="text-gray-800 text-sm font-medium">
          <span className="text-base text-gray-800 ">{price.amount} /-</span>
        </p>}
        <p className="text-gray-700 dark:text-gray-400 text-xs line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
