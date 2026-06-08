"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

interface BlogSliderProps {
  children: React.ReactNode[];
  itemsPerSlide?: number;
  gap?: number;
  className?: string;
}

export default function BlogSlider({
  children,
  itemsPerSlide = 3,
  gap = 30,
  className = "",
}: BlogSliderProps) {
  const slides = React.Children.toArray(children);

  return (
    <div className={`tp-blog-slider ${className}`}>
      <div className="tp-blog-slider-active swiper">
        <div
          className="pb-60 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".7s"
        >
          <Swiper
            modules={[Pagination]}
            slidesPerView={itemsPerSlide}
            spaceBetween={gap}
            loop={slides.length > itemsPerSlide + 1}
            freeMode={true}
            breakpoints={{
              1400: { slidesPerView: itemsPerSlide },
              1200: { slidesPerView: itemsPerSlide },
              768: { slidesPerView: 2 },
              576: { slidesPerView: 1 },
              0: { slidesPerView: 1 },
            }}
            pagination={{
              el: ".tp-blog-slider-dot",
              clickable: true,
            }}
          >
            {slides.map((child, index) => (
              <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="tp-blog-slider-dot"></div>
      </div>
    </div>
  );
}
