import { MapPin, Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Bestellen",
  description:
    "Bestel handgemaakt keramiek bij Pottenbakkerij de Graal. Bezoek ons atelier of winkel, of bestel online voor afhaling.",
};

export default function BestellenPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-charcoal mb-4">
          Bestellen
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Bezoek ons atelier of winkel, of bestel online voor afhaling
        </p>
      </div>

      {/* Physical Locations */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Atelier Wolfstraat */}
        <div className="bg-secondary rounded-2xl p-8 shadow-lg">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Atelier de Graal
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Wolfstraat 5</p>
                <p className="text-muted-foreground">6531 LK Nijmegen</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Wolfstraat+5+6531+LK+Nijmegen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-1 inline-block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Openingstijden</p>
                <p className="text-muted-foreground text-sm">
                  Op afspraak
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Bezoek ons atelier en zie waar het ambacht plaatsvindt. 
            Maak een afspraak voor een persoonlijk bezoek en ontdek de collectie.
          </p>
        </div>

        {/* Ieder Zijn Vak */}
        <div className="bg-secondary rounded-2xl p-8 shadow-lg">
          <h2 className="font-serif text-2xl font-semibold mb-4">
            Ieder Zijn Vak Nijmegen
          </h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Lange Hezelstraat 72-76</p>
                <p className="text-muted-foreground">6511 CL Nijmegen</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lange+Hezelstraat+72+Nijmegen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm mt-1 inline-block"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Openingstijden</p>
                <p className="text-muted-foreground text-sm">
                  Ma-Za: 10:00 - 18:00
                </p>
                <p className="text-muted-foreground text-sm">
                  Zo: 12:00 - 17:00
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Vind onze keramiek in deze prachtige concept store in hartje Nijmegen, 
            samen met andere lokale makers en ambachtslieden.
          </p>
        </div>
      </div>

      {/* Order Form Section */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-sand/30 to-secondary rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-semibold mb-3">
              Bestel voor Afhaling
            </h2>
            <p className="text-muted-foreground">
              Vul onderstaand formulier in om keramiek te bestellen. 
              Je ontvangt een bevestiging en kunt je bestelling ophalen bij het atelier.
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-3">
              Binnenkort beschikbaar
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We werken hard aan het online bestelformulier. 
              Neem ondertussen gerust direct contact met ons op via e-mail.
            </p>
            <a
              href="mailto:info@pottenbakkerijdegraal.nl"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <Mail className="h-5 w-5" />
              info@pottenbakkerijdegraal.nl
            </a>
          </div>
        </div>

        {/* Contact Info - Removed as it's now in the coming soon message */}
      </div>
    </div>
  );
}
