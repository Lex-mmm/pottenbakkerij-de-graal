import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { listPublicImages, pickHeroImage } from "@/lib/images";

// Force dynamic rendering to allow filesystem operations at runtime
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Over Max",
  description:
    "Maak kennis met Max, de selfmade pottenbakker achter Pottenbakkerij de Graal sinds 1984.",
};

export default async function AboutPage() {
  const [hero, maxImages] = await Promise.all([
    pickHeroImage("Max"),
    listPublicImages("Max"),
  ]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Hero */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center mb-12">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Over Max - De Pottenbakker
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Max is de drijvende kracht achter Pottenbakkerij de Graal, die al sinds 1984 bestaat. 
            Als selfmade pottenbakker behoort hij tot één van de weinigen in Nederland die nog 
            handgedraaid aardewerk kan maken, ook het grotere werk.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Met meer dan 40 jaar ervaring combineert Max traditioneel ambacht met een moderne visie. 
            Elk stuk dat zijn atelier verlaat, draagt zijn persoonlijke signatuur en jarenlange expertise.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Max is vader van 4 kinderen (3 dochters en een zoon) en trotse opa van 10 kleinzonen. 
            Zijn passie voor het vak en toewijding aan kwaliteit geeft hij graag door aan de volgende generaties.
          </p>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary shadow-xl">
          {hero ? (
            <Image
              src={hero}
              alt="Max – Pottenbakkerij de Graal"
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
        {/* Max Photos - Feature Gallery */}
        {maxImages.length > 1 && (
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-sand/30 to-transparent -z-10 rounded-3xl" />
            <div className="py-12">
              <h2 className="font-serif text-3xl font-semibold mb-8 text-center">
                Max aan het werk
              </h2>
              
              {/* Two column layout with equal sized images */}
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {maxImages.slice(1).map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <Image
                      src={src}
                      alt={`Max de pottenbakker ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
