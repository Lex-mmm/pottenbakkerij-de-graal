import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/Logo/LogoDeGraal_v2.png"
                alt="Pottenbakkerij de Graal"
                width={160}
                height={45}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.about.short}
            </p>
          </div>

          {/* Navigatie */}
          <div>
            <h4 className="font-semibold mb-4">Navigatie</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/atelier"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Atelier
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Over Max
                </Link>
              </li>
              <li>
                <Link
                  href="/bestellen"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Bestellen
                </Link>
              </li>
            </ul>
          </div>

          {/* Klantenservice */}
          <div>
            <h4 className="font-semibold mb-4">Klantenservice</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/legal/shipping-returns"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Verzending & Retour
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Algemene Voorwaarden
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4 flex-shrink-0 text-primary" />
                <a
                  href={siteConfig.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {siteConfig.contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Alle rechten
            voorbehouden.
          </p>
          <p className="mt-2 text-xs">
            BTW-nummer: {siteConfig.legal.btw} | KvK: {siteConfig.legal.kvk}
          </p>
        </div>
      </div>
    </footer>
  );
}
