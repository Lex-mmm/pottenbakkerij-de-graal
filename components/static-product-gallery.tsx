"use client";

import Image from "next/image";
import { useState } from "react";

interface StaticProductGalleryProps {
  images: string[];
}

export function StaticProductGallery({ images }: StaticProductGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {images.map((src, index) => (
        <div
          key={src}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            animation: `fadeInUp 0.6s ease-out ${index * 80}ms both`,
          }}
        >
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={src}
              alt={`Handgemaakte keramiek - ${src.split('/').pop()?.replace(/\.(jpg|jpeg|png)/, '').replace(/_/g, ' ')}`}
              fill
              className={`object-cover transition-all duration-700 ${
                hoveredIndex === index ? "scale-110" : "scale-100"
              }`}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
            />
            
            {/* Product Name on Hover */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 ${
                hoveredIndex === index ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <p className="font-serif text-white text-sm md:text-base font-semibold capitalize">
                {src
                  .split('/')
                  .pop()
                  ?.replace(/\.(jpg|jpeg|png)/, '')
                  .replace(/_/g, ' ')}
              </p>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
