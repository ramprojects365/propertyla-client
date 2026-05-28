"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: itemsPerSlide });
  const sliderRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;
  const [itemWidth, setItemWidth] = useState(0);

  // Calculate items per slide based on screen size
  const getItemsPerSlide = useCallback(() => {
    if (typeof window === "undefined") return itemsPerSlide;
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile: 1 item
    if (width < 992) return 2; // Tablet: 2 items
    return itemsPerSlide; // Desktop: default (3 items)
  }, [itemsPerSlide]);

  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(getItemsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      setCurrentItemsPerSlide(newItemsPerSlide);
      // Reset index if it would be out of bounds
      const maxIndex = Math.max(0, totalItems - newItemsPerSlide);
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex, totalItems, getItemsPerSlide]);

  // Update visible range for lazy loading
  useEffect(() => {
    const start = currentIndex;
    const end = Math.min(currentIndex + currentItemsPerSlide + 1, totalItems);
    setVisibleRange({ start, end });
  }, [currentIndex, currentItemsPerSlide, totalItems]);

  // Calculate item width on mount and resize
  useEffect(() => {
    const calculateItemWidth = () => {
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        const calculatedWidth = (containerWidth - gap * (currentItemsPerSlide - 1)) / currentItemsPerSlide;
        setItemWidth(calculatedWidth);
      }
    };

    calculateItemWidth();
    window.addEventListener('resize', calculateItemWidth);
    return () => window.removeEventListener('resize', calculateItemWidth);
  }, [currentItemsPerSlide, gap]);

  const maxIndex = Math.max(0, totalItems - currentItemsPerSlide);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Calculate total slides
  const totalSlides = Math.ceil(totalItems / currentItemsPerSlide);
  const currentSlide = Math.floor(currentIndex / currentItemsPerSlide);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`blog-slider ${className}`}>
      <div className="blog-slider-container position-relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="blog-slider-nav blog-slider-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Slider Track */}
        <div
          ref={sliderRef}
          className="blog-slider-track"
          style={{
            display: "flex",
            gap: `${gap}px`,
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="blog-slider-item"
              style={{
                flex: `0 0 ${itemWidth}px`,
                minWidth: 0,
                opacity: index >= visibleRange.start && index < visibleRange.end ? 1 : 0.3,
                transition: "opacity 0.3s ease",
              }}
            >
              {index >= visibleRange.start && index < visibleRange.end ? (
                child
              ) : (
                <div style={{ height: "100%", minHeight: "300px" }} />
              )}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="blog-slider-nav blog-slider-next"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        .blog-slider {
          position: relative;
        }

        .blog-slider-container {
          overflow: hidden;
          padding: 0 40px;
        }

        .blog-slider-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #003b5c;
          background: white;
          color: #003b5c;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .blog-slider-nav:hover:not(:disabled) {
          background: #003b5c;
          color: white;
        }

        .blog-slider-nav:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .blog-slider-prev {
          left: 0;
        }

        .blog-slider-next {
          right: 0;
        }

        .blog-slider-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }

        .blog-slider-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid #003b5c;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .blog-slider-dot:hover {
          background: #003b5c;
        }

        .blog-slider-dot.active {
          background: #003b5c;
        }

        @media (max-width: 767px) {
          .blog-slider-container {
            padding: 0 30px;
          }

          .blog-slider-nav {
            width: 32px;
            height: 32px;
          }

          .blog-slider-nav svg {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </div>
  );
}
