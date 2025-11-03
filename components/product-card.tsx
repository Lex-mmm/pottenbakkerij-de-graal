import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/schemas";
import { formatPrice, getStockBadge } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const stockBadge = getStockBadge(product.stock);
  const firstImage = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Image
              src={firstImage.src}
              alt={firstImage.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-white">
                Aanbevolen
              </Badge>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">
                  Uitverkocht
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 gap-2">
          <h3 className="font-serif text-lg font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center justify-between w-full">
            <p className="text-xl font-bold text-primary">
              {formatPrice(product.priceCents)}
            </p>
            <Badge variant={stockBadge.variant}>{stockBadge.text}</Badge>
          </div>
          {product.glaze && (
            <p className="text-sm text-muted-foreground">
              Glazuur: {product.glaze}
            </p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
