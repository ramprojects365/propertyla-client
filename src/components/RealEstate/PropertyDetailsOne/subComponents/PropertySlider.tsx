"use client";
import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

const fallbackImages = [
  "/assets/img/property/property-details/property-thumb-1.jpg",
  "/assets/img/property/property-details/property-thumb-2.jpg",
  "/assets/img/property/property-details/property-thumb-3.jpg",
];

interface Props {
  images?: string[];
}

export default function PropertyDetailsSlider({ images }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [navState, setNavState] = useState({ isBeginning: true, isEnd: false });

  const urls = useMemo(() => {
    const list = images?.filter((u) => typeof u === "string" && u.trim()) ?? [];
    return list.length > 0 ? list : fallbackImages;
  }, [images]);

  const extraCount = urls.length > 5 ? urls.length - 5 : 0;
  const modalUrls = useMemo(() => {
    if (urls.length >= 5) return urls;
    return [...urls, ...fallbackImages, ...fallbackImages].slice(0, 5);
  }, [urls]);

  const openAt = (index: number) => {
    setStartIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="tp-property-details-gallery">
      <div className="tp-pdg-five">
        <button
          type="button"
          className="tp-pdg-tile tp-pdg-main"
          onClick={() => openAt(0)}
        >
          <img src={modalUrls[0]} alt="property-image-1" />
        </button>
        <div className="tp-pdg-side">
          {modalUrls.slice(1, 5).map((u, idx) => {
            const absoluteIndex = idx + 1;
            const isLastVisible = idx === 3;
            return (
              <button
                key={`${u}-${idx}`}
                type="button"
                className="tp-pdg-tile"
                onClick={() => openAt(absoluteIndex)}
              >
                <img src={u} alt={`property-image-${absoluteIndex + 1}`} />
                {isLastVisible && extraCount > 0 && (
                  <span className="tp-pdg-more">{`+ ${extraCount} more images`}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {isOpen && (
        <div className="tp-pdg-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="tp-pdg-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="tp-pdg-modal-inner">
            <Swiper
              key={startIndex}
              initialSlide={startIndex}
              slidesPerView={1}
              spaceBetween={0}
              loop={false}
              onSwiper={(instance) => {
                setSwiper(instance);
                setNavState({
                  isBeginning: instance.isBeginning,
                  isEnd: instance.isEnd,
                });
              }}
              onSlideChange={(instance) =>
                setNavState({
                  isBeginning: instance.isBeginning,
                  isEnd: instance.isEnd,
                })
              }
            >
              {modalUrls.map((u, i) => (
                <SwiperSlide key={`${u}-${i}`}>
                  <div className="tp-pdg-modal-slide">
                    <img src={u} alt={`property-image-${i + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button
            type="button"
            className="tp-pdg-nav tp-pdg-prev"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous"
            disabled={modalUrls.length <= 1 || navState.isBeginning}
          >
            ‹
          </button>
          <button
            type="button"
            className="tp-pdg-nav tp-pdg-next"
            onClick={() => swiper?.slideNext()}
            aria-label="Next"
            disabled={modalUrls.length <= 1 || navState.isEnd}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
