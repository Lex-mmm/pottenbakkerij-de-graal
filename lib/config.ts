/**
 * Pottenbakkerij de Graal - Site Configuration
 * 
 * Update deze gegevens met je eigen informatie
 */

export const siteConfig = {
  // Bedrijfsinformatie
  name: "Pottenbakkerij de Graal",
  tagline: "Handgemaakt Keramiek",
  description: "Unieke, handgedraaide keramiek. Mokken, schalen, vazen en borden met ambachtelijke uitstraling. Gemaakt met liefde in kleine oplages.",
  
  // Contact informatie
  contact: {
    email: "info@degraal.nl",
    phone: "", // Optioneel
    instagram: "@degraal",
    instagramUrl: "https://instagram.com/degraal",
  },
  
  // Atelier adres
  address: {
    street: "Wolfstraat 5",
    postalCode: "6531 LK",
    city: "Utrecht",
    country: "Nederland",
    

    
    // Google Maps link (pas aan naar jouw adres)
    mapsUrl: "https://maps.app.goo.gl/MqfjEaZecRVk91t49",
  },
  
  // Openingstijden (optioneel)
  openingHours: {
    showOnSite: false, // Zet op true om weer te geven
    hours: [
      { days: "Maandag - Vrijdag", time: "10:00 - 17:00" },
      { days: "Zaterdag", time: "10:00 - 15:00" },
      { days: "Zondag", time: "Gesloten" },
    ],
    note: "Bezoek op afspraak. Neem contact op voor een bezoek aan het atelier.",
  },
  
  // Bedrijfsgegevens (voor footer)
  legal: {
    kvk: "12345678", // KvK nummer
    btw: "NL123456789B01", // BTW nummer
    iban: "NL00BANK0123456789", // Voor betalingsinstructies
  },
  
  // Social Media
  social: {
    instagram: "https://instagram.com/degraal",
    facebook: "", // Optioneel
    pinterest: "", // Optioneel
  },
  
  // Website instellingen
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  
  // Shipping informatie (gebruikt in checkout)
  shipping: {
    freeShippingThreshold: 10000, // In cents (€100)
    methods: [
      {
        id: "pickup",
        name: "Afhalen in atelier",
        description: "Gratis afhalen in Nijmegen",
        priceCents: 0,
      },
      {
        id: "postnl-0-2kg",
        name: "PostNL (0-2 kg)",
        description: "Bezorging binnen 2-4 werkdagen",
        priceCents: 695,
      },
      {
        id: "postnl-2-5kg",
        name: "PostNL (2-5 kg)",
        description: "Bezorging binnen 2-4 werkdagen",
        priceCents: 895,
      },
      {
        id: "postnl-5-10kg",
        name: "PostNL (5-10 kg)",
        description: "Bezorging binnen 2-4 werkdagen",
        priceCents: 1295,
      },
    ],
  },
  
  // Over ons tekst (kort, voor footer e.d.)
  about: {
    short: "Handgemaakt keramiek met hart en ziel. Elke stuk is uniek en gemaakt van klei in kleine oplages.",
    
    // Lange beschrijving voor de About pagina
    long: `Welkom bij Pottenbakkerij de Graal! In ons atelier in Nijmegen maakt Max handgedraaid keramiek met liefde en aandacht voor detail.
    
Elk stuk begint als een klomp klei en wordt door onze handen gevormd op de draaischijf. Na het draaien volgt een proces van drogen, bijwerken, bakken en glazuren. Dit hele proces duurt gemiddeld 2-3 weken voordat een stuk klaar is.

Wij geloven in duurzaam en bewust vakmanschap. Daarom werken we met lokale materialen, kleine oplages en tijdloze ontwerpen die generaties lang meegaan.`,
  },
  
  // USP's (gebruikt op homepage)
  usps: [
    "Handgedraaid",
    "Klei",
    "Kleine oplages",
    "Unieke stukken",
  ],
  
  // SEO / Metadata
  metadata: {
    keywords: [
      "pottenbakkerij",
      "keramiek",
      "handgemaakt",
      "Nijmegen",
      "lokaal",
      "ambacht",
      "handgedraaid",
      "mokken",
      "schalen",
      "vazen",
    ],
  },
};

// Type exports voor TypeScript
export type SiteConfig = typeof siteConfig;
