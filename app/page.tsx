import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductShowcase } from "@/components/product-showcase";
import { MasonryGallery } from "@/components/masonry-gallery";
import { ImageStrip } from "@/components/image-strip";
import { prisma } from "@/lib/prisma";
import { pickHeroImage, listPublicImages } from "@/lib/images";
import type { Product } from "@/lib/schemas";

// Force dynamic rendering to allow filesystem operations at runtime
export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6, // Show 6 featured products
  });

  return products.map((p) => ({
    ...p,
    images: JSON.parse(p.images) as { src: string; alt: string }[],
    glaze: p.glaze ?? undefined,
    size: p.size ?? undefined,
    weightGrams: p.weightGrams ?? undefined,
    createdAt: p.createdAt.toISOString(),
  }));
}

async function getAllProductImages() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: {
      slug: true,
      title: true,
      images: true,
    },
    take: 12, // Limit for gallery
  });

  return products.flatMap((p) => {
    const imgs = JSON.parse(p.images) as { src: string; alt: string }[];
    return imgs.map((img) => ({
      src: img.src,
      alt: img.alt,
      product: { title: p.title, slug: p.slug },
    }));
  });
}

export default async function Home() {
  const [featuredProducts, heroAtelier, productionImages, productGalleryImages] = await Promise.all([
    getFeaturedProducts(),
    pickHeroImage("atelier"),
    listPublicImages("production"),
    getAllProductImages(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sand to-background py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Handgemaakt met liefde
              </Badge>
              <h1 className="font-serif text-4xl font-bold tracking-tight text-charcoal sm:text-5xl md:text-6xl mb-6">
                Uniek keramiek uit lokale klei
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Bij Pottenbakkerij de Graal draait alles om ambacht en
                authenticiteit. Elk stuk is met de hand gedraaid op de
                draaischijf, gebakken en geglazuurd in ons atelier. Geen twee
                stukken zijn hetzelfde.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/shop">Ontdek de Collectie</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/about">Over Ons</Link>
                </Button>
              </div>

              {/* USPs */}
              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Handgedraaid</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Lokale klei</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Kleine oplages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Unieke stukken</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-2xl">
              {heroAtelier ? (
                <Image
                  src={heroAtelier}
                  alt="Atelier foto – Pottenbakkerij de Graal"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <p className="text-lg font-medium">Atelier Foto</p>
                    <p className="text-sm">Voeg beelden toe in /public/images/atelier</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl mb-4">
              Uitgelichte Producten
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ontdek onze meest geliefde stukken, met de hand gemaakt en klaar
              om jouw huis te verrijken.
            </p>
          </div>

          <ProductShowcase products={featuredProducts} />

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/shop">Bekijk Alle Producten</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Masonry Product Gallery */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-sand/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl mb-4">
              Onze Collectie
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elk stuk vertelt een verhaal van ambacht, geduld en vakmanschap.
            </p>
          </div>

          <MasonryGallery images={productGalleryImages} columns={3} />
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-charcoal sm:text-4xl mb-4">
              Van Klei tot Kunstwerk
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elk stuk doorloopt een zorgvuldig proces van wel 2-3 weken.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {[
              { step: "1", title: "Klei voorbereiden" },
              { step: "2", title: "Draaien" },
              { step: "3", title: "Drogen" },
              { step: "4", title: "Biscuit bakken" },
              { step: "5", title: "Glazuren" },
              { step: "6", title: "Glansbranden" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-medium">{item.title}</h3>
              </div>
            ))}
          </div>

          {/* Behind the scenes image strip */}
          <div className="mt-12">
            <ImageStrip
              title="Achter de schermen"
              images={productionImages}
              altPrefix="Productieproces"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

