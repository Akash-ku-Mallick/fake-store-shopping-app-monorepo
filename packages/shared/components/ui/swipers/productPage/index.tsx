import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom, Thumbs, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";
import "swiper/css/thumbs";
import { FC, useState } from "react";

interface Props {
  images: string[];
  productTitle: string;
}

const ProductsImageSwiper: FC<Props> = ({ images, productTitle }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Vertical Thumbnails (Desktop only) */}
      <div className=" md:block">
        <div className="h-[75vh] overflow-y-auto">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[Thumbs, FreeMode]}
            direction="vertical"
            freeMode
            watchSlidesProgress
            slidesPerView={"auto"}              // auto height slides
            spaceBetween={8}
            className="w-20 h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="!h-20"> {/* fixed thumb height */}
                <img
                  src={img}
                  alt={`${productTitle}-thumb-${i}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Zoom, Thumbs]}
        // Only attach thumbs if it's alive
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        // navigation
        zoom
        spaceBetween={10}
        slidesPerView={1}
        className="
          h-60 md:h-[75vh] rounded-lg overflow-hidden w-full
          md:[&_.swiper-button-next]:hidden md:[&_.swiper-button-prev]:hidden
        "
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="swiper-zoom-container">
              <img
                src={img}
                alt={`${productTitle}-${i}`}
                className="w-full h-60 md:h-[75vh] object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductsImageSwiper;
