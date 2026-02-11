"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Link from "next/link";

// Type for carousel items
interface CarouselItem {
  id: string;
  url?: string;
  title?: string;
  description?: string;
  route?: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

interface HeroBannerProps {
  slides: CarouselItem[];
}

const HeroBanner: React.FC<HeroBannerProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = (): void =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = (): void =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || !slides.length) return null;

  return (
    <div className="relative h-48 md:h-80 lg:h-96 flex items-center justify-center overflow-hidden rounded-3xl mx-4 my-4 sm:m-4">
  {/* Slides */}
  {slides.map((slide, index) => (
    <div
      key={slide.id}
      className={`absolute inset-0 transition-opacity duration-500 ${
        index === currentSlide ? "opacity-100" : "opacity-0"
      }`}
    >
      {slide.url && (
        <Image
          src={slide.url}
          alt={slide.title || "Slide"}
          fill
          className="object-cover"
          priority={index === 0}
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  ))}
  
  {/* Content */}
  <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-2xl">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
      {slides[currentSlide]?.title}
    </h1>
    <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-5 md:mb-6 opacity-90 max-w-xl mx-auto">
      {slides[currentSlide]?.description}
    </p>
    {slides[currentSlide]?.route && (
      <Link
        href={slides[currentSlide].route}
        className="mt-2 sm:mt-4 md:mt-6 inline-block px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-yellow-400 text-gray-900 font-semibold uppercase tracking-wider rounded-lg hover:bg-yellow-300 transition shadow-lg text-sm sm:text-base md:text-lg text-center"
      >
        Shop Now
      </Link>
    )}
  </div>

  {/* Navigation Arrows */}
  <button
    onClick={prevSlide}
    className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 sm:p-3 rounded-full text-gray-700 hover:bg-white z-30 transition-colors"
    aria-label="Previous slide"
  >
    <ChevronLeft size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
  </button>
  <button
    onClick={nextSlide}
    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-white/70 p-2 sm:p-3 rounded-full text-gray-700 hover:bg-white z-30 transition-colors"
    aria-label="Next slide"
  >
    <ChevronRight size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
  </button>

  {/* Slide Indicators */}
  <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentSlide(index)}
        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
          index === currentSlide ? "bg-white" : "bg-white/50"
        }`}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
</div>
  );
};

export default HeroBanner;
