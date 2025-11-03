import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { listPublicImages, pickHeroImage } from "@/lib/images";

// Force dynamic rendering to allow filesystem operations at runtime
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Over Ons",
  description:
    "Maak kennis met Pottenbakkerij de Graal: ons atelier, het ambacht en de mensen erachter.",
};

export default async function AboutPage() {
  const [hero, atelierImages, productionImages] = await Promise.all([
    pickHeroImage("atelier"),
    listPublicImages("atelier"),
    listPublicImages("production"),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center mb-12">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Over Pottenbakkerij de Graal
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {siteConfig.about.long}
          </p>

          <div className="mt-6 text-sm text-muted-foreground">
            <p className="font-medium">Atelier</p>
            <p>
              {siteConfig.address.street}, {siteConfig.address.postalCode}{" "}
              {siteConfig.address.city}
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary shadow-xl">
          {hero ? (
            <Image
              src={hero}
              alt="Atelier – Pottenbakkerij de Graal"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
        </div>
      </div>

      {/* Galleries */}
      <div className="space-y-12">
        {/* Atelier */}
        <section>
          <h2 className="font-serif text-3xl font-semibold mb-6">Het Atelier</h2>
          {atelierImages.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {atelierImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary"
                >
                  <Image
                    src={src}
                    alt={`Atelier foto ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Voeg beelden toe in /images/atelier</p>
          )}
        </section>

        {/* Productieproces */}
        <section>
          <h2 className="font-serif text-3xl font-semibold mb-6">Het Proces</h2>
          {productionImages.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productionImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-lg bg-secondary"
                >
                  <Image
                    src={src}
                    alt={`Productieproces ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Voeg beelden toe in /images/production
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
