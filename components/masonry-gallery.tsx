"use client";

import Image from "next/image";
import Link from "next/link";

interface MasonryGalleryProps {
  images: { src: string; alt: string; product?: { title: string; slug: string } }[];
  columns?: number;
}

export function MasonryGallery({ images, columns = 3 }: MasonryGalleryProps) {
  // Distribute images across columns for masonry effect
  const distributeImages = () => {
    const cols: (typeof images)[] = Array.from({ length: columns }, () => []);
    images.forEach((img, index) => {
      cols[index % columns].push(img);
    });
    return cols;
  };

  const columnImages = distributeImages();

  return (
    <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-4`}>
      {columnImages.map((colImages, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-4">
          {colImages.map((image, imgIndex) => {
            const isLink = !!image.product;
            const content = (
              <div
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${(colIndex * 100 + imgIndex * 150)}ms both`,
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  
                  {/* Hover Overlay */}
                  {isLink && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Product Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <p className="font-serif text-white text-lg font-semibold">
                          {image.product?.title}
                        </p>
                        <span className="text-sand text-sm font-medium">
                          Bekijk product →
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );

            return isLink ? (
              <Link key={imgIndex} href={`/shop/${image.product!.slug}`}>
                {content}
              </Link>
            ) : (
              <div key={imgIndex}>{content}</div>
            );
          })}
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
