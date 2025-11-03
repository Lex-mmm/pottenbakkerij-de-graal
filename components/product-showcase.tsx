"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/schemas";

interface ProductShowcaseProps {
  products: Product[];
}

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => {
        const isHovered = hoveredId === product.id;
        const mainImage = product.images[0];
        const hoverImage = product.images[1] || mainImage;

        return (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative overflow-hidden rounded-2xl bg-secondary shadow-lg hover:shadow-2xl transition-all duration-500"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              {/* Main Image */}
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover Image */}
              {product.images.length > 1 && (
                <Image
                  src={hoverImage.src}
                  alt={hoverImage.alt}
                  fill
                  className={`object-cover transition-all duration-700 ${
                    isHovered ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              {/* Overlay Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="default" className="bg-clay text-white font-medium">
                    Uitgelicht
                  </Badge>
                </div>
              )}

              {/* Stock Badge */}
              {product.stock <= 2 && product.stock > 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="secondary" className="font-medium">
                    Nog {product.stock} op voorraad
                  </Badge>
                </div>
              )}

              {product.stock === 0 && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="destructive" className="font-medium">
                    Uitverkocht
                  </Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <h3 className="font-serif text-xl font-semibold text-charcoal mb-2 group-hover:text-clay transition-colors">
                {product.title}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-clay">
                  {formatPrice(product.priceCents)}
                </span>

                {/* View Details Button */}
                <span
                  className={`text-sm font-medium text-charcoal group-hover:text-clay transition-all duration-300 ${
                    isHovered ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                  }`}
                >
                  Bekijk details →
                </span>
              </div>

              {/* Glaze Info */}
              {product.glaze && (
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Glazuur: {product.glaze}
                  </span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
