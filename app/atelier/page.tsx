import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { listPublicImages, pickHeroImage } from "@/lib/images";

// Force dynamic rendering to allow filesystem operations at runtime
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Atelier",
  description:
    "Bezoek ons atelier in Nijmegen. Ontdek waar het ambacht plaatsvindt en bekijk ons productieproces.",
};

export default async function AtelierPage() {
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
            Het Atelier
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {siteConfig.about.long}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="font-semibold text-charcoal mb-1">Locatie</p>
              <p className="text-muted-foreground">
                {siteConfig.address.street}<br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal mb-1">Contact</p>
              <p className="text-muted-foreground">
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                  {siteConfig.contact.email}
                </a>
                <br />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary">
                  {siteConfig.contact.phone}
                </a>
              </p>
            </div>
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
        {/* Atelier Foto's */}
        <section>
          <h2 className="font-serif text-3xl font-semibold mb-6">Het Atelier</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Ons atelier is de plek waar traditioneel ambacht en vakmanschap samenkomen. 
            Hier wordt elk stuk met de hand gedraaid, geglazuurd en gebakken.
          </p>
          {atelierImages.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {atelierImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary shadow-md hover:shadow-xl transition-shadow"
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
          <h2 className="font-serif text-3xl font-semibold mb-6">Het Productieproces</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Van ruwe klei tot het eindproduct: elk stuk doorloopt een zorgvuldig proces 
            van draaien, drogen, glazuren en bakken.
          </p>
          {productionImages.length ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {productionImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-lg bg-secondary shadow-md hover:shadow-xl transition-shadow"
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
