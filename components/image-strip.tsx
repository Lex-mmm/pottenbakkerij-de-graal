import Image from "next/image";

interface ImageStripProps {
  title?: string;
  images: string[]; // public paths, e.g. /images/production/foo.jpg
  altPrefix?: string;
}

export function ImageStrip({ title, images, altPrefix = "Foto" }: ImageStripProps) {
  if (!images?.length) return null;

  return (
    <div className="space-y-6">
      {title ? (
        <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal">
          {title}
        </h3>
      ) : null}
      <div className="relative -mx-4 sm:mx-0">
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory">
          {images.map((src, idx) => (
            <div
              key={src}
              className="relative h-56 w-72 md:h-64 md:w-96 flex-shrink-0 overflow-hidden rounded-lg bg-secondary snap-start"
            >
              <Image
                src={src}
                alt={`${altPrefix} ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 80vw, 33vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
