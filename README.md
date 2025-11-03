# Pottenbakkerij de GraalThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Een moderne, productie-klare webshop voor handgemaakt keramiek, gebouwd met Next.js 14, TypeScript, Prisma, Stripe en Tailwind CSS.## Getting Started



## 🎨 FeaturesFirst, run the development server:



- ✅ **Next.js 14** met App Router en Server Components```bash

- ✅ **TypeScript** voor type-safetynpm run dev

- ✅ **Prisma** ORM met SQLite (dev) / PostgreSQL (prod)# or

- ✅ **Stripe** checkout met iDEAL + creditcardsyarn dev

- ✅ **shadcn/ui** components voor consistente, toegankelijke UI# or

- ✅ **Tailwind CSS** met warm artisanal themapnpm dev

- ✅ **Responsive** en mobile-first design# or

- ✅ **SEO-optimized** met metadatabun dev

- ✅ **Cart** met localStorage persistence```

- ✅ **Product filters** op categorie

- ✅ **11 producten** in 4 categorieën (seed data)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- ✅ **GDPR-ready** structure

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 🚀 Snel starten

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Prerequisites

## Learn More

- Node.js 18+ en npm (geïnstalleerd ✅)

- Een Stripe account (test mode keys)To learn more about Next.js, take a look at the following resources:



### Installatie- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

```bash

# Navigeer naar de project folderYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

cd /Users/l.m.vanloon/deGraal/pottenbakkerij-de-graal

## Deploy on Vercel

# Environment variabelen zijn al ingesteld in .env

# Vul je eigen Stripe keys in wanneer je die hebtThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



# De database is al gegenereerd en geseed! ✅Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Maar je kunt opnieuw seeden met:
npm run db:seed

# Start de development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## 📁 Project Structuur

```
pottenbakkerij-de-graal/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout met Header/Footer
│   ├── page.tsx              # Homepage ✅
│   └── globals.css           # Warm artisanal theme ✅
├── components/               # React components
│   ├── ui/                   # shadcn/ui components ✅
│   ├── header.tsx            # Navigation + Cart badge ✅
│   ├── footer.tsx            # Footer met links ✅
│   ├── product-card.tsx      # Product card component ✅
│   ├── product-grid.tsx      # Grid layout ✅
│   └── image-gallery.tsx     # Image carousel ✅
├── lib/                      # Utilities
│   ├── prisma.ts             # Prisma client ✅
│   ├── stripe.ts             # Stripe config ✅
│   ├── schemas.ts            # Zod schemas ✅
│   ├── format.ts             # Formatters (price, date) ✅
│   ├── cart-context.tsx      # Cart management ✅
│   └── utils.ts              # cn() helper ✅
├── prisma/
│   ├── schema.prisma         # Database models ✅
│   └── seed.ts               # Seeder ✅
├── data/
│   ├── categories.json       # 4 categories ✅
│   └── products.json         # 11 products ✅
└── public/
    └── images/products/      # Plaats hier je foto's
```

## 🗄️ Database

De database bevat al:
- ✅ 4 Categorieën (Mokken, Schalen, Vazen, Borden)
- ✅ 11 Producten met Nederlandse beschrijvingen
- ✅ 1 Workshop voorbeeld

### Database Commands

```bash
# Open Prisma Studio (visual database editor)
npm run db:studio

# Reset en opnieuw seeden
npx prisma db push --force-reset
npm run db:seed
```

## 🎨 Theming

Warm artisanal kleurenschema:
- **Clay** (#b96f4a): Primary brand color
- **Sand** (#f6efe7): Backgrounds
- **Charcoal** (#1f2937): Text
- **Terracotta** (#d47853): Accents

Fonts:
- **Playfair Display** (serif) voor H1-H6
- **Inter** (sans-serif) voor body

## 📝 Volgende Stappen

### 1. Afbeeldingen toevoegen

Plaats product foto's in `public/images/products/`:
```
public/images/products/
  ├── mok-espresso-1.jpg
  ├── mok-cappuccino-1.jpg
  ├── schaal-ontbijt-1.jpg
  └── ...
```

**Tips:**
- Gebruik vierkante afbeeldingen (1:1 ratio)
- Minimaal 800x800px
- Optimaliseer met [TinyPNG](https://tinypng.com/)

### 2. Shop pagina maken

```tsx
// app/shop/page.tsx
import { prisma } from "@/lib/prisma";
import { ProductGrid } from "@/components/product-grid";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  
  const serialized = products.map(p => ({
    ...p,
    images: JSON.parse(p.images),
    glaze: p.glaze ?? undefined,
    size: p.size ?? undefined,
    weightGrams: p.weightGrams ?? undefined,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl font-bold mb-8">Winkel</h1>
      <ProductGrid products={serialized} />
    </div>
  );
}
```

### 3. Product detail pagina

```tsx
// app/shop/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { ImageGallery } from "@/components/image-gallery";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) return <div>Product niet gevonden</div>;
  
  const images = JSON.parse(product.images);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <ImageGallery images={images} productName={product.title} />
        <div>
          <h1 className="font-serif text-4xl font-bold mb-4">
            {product.title}
          </h1>
          <p className="text-3xl font-bold text-primary mb-6">
            {formatPrice(product.priceCents)}
          </p>
          <div className="prose">
            {product.description}
          </div>
          <Button size="lg" className="mt-8">
            Toevoegen aan winkelwagen
          </Button>
        </div>
      </div>
    </div>
  );
}
```

### 4. Cart pagina toevoegen

```tsx
// app/cart/page.tsx
"use client";

import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { items, totalCents } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-4xl mb-4">Je winkelwagen is leeg</h1>
        <Button asChild>
          <Link href="/shop">Ga naar winkel</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-8">Winkelwagen</h1>
      {/* Cart items lijst */}
      <div className="mt-8 flex justify-between items-center">
        <p className="text-2xl font-bold">
          Totaal: {formatPrice(totalCents)}
        </p>
        <Button size="lg" asChild>
          <Link href="/checkout">Afrekenen</Link>
        </Button>
      </div>
    </div>
  );
}
```

### 5. Stripe Setup

1. Maak een [Stripe account](https://stripe.com)
2. Ga naar **Developers** → **API keys**
3. Update `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_jouw_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_jouw_key
   ```

### 6. About en Contact pagina's

Maak `app/about/page.tsx` en `app/contact/page.tsx` met je atelier verhaal en contactinformatie.

### 7. Legal pagina's

Maak GDPR-compliant pagina's:
- `app/legal/privacy/page.tsx`
- `app/legal/terms/page.tsx`
- `app/legal/shipping-returns/page.tsx`

## 💳 Stripe Integration (Later)

```typescript
// app/api/checkout/route.ts
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { items, email } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "ideal"],
    customer_email: email,
    line_items: items.map((item: any) => ({
      price_data: {
        currency: "eur",
        unit_amount: item.priceCents,
        product_data: { name: item.title },
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
```

## 🚀 Deployment op Vercel

```bash
# Installeer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Voor productie database: gebruik Vercel Postgres
# En update DATABASE_URL in Vercel environment variables
```

## 📧 Hulp nodig?

Het project is volledig gestructureerd en klaar om uit te breiden. Alle basis componenten, database modellen en utilities zijn aanwezig.

**Wat werkt al:**
- ✅ Homepage met featured products
- ✅ Database met 11 producten
- ✅ Responsive header & footer
- ✅ Cart context (localStorage)
- ✅ Warm artisanal design
- ✅ Product components
- ✅ Image gallery component

**Wat je nog moet maken:**
- Shop pagina met filters
- Product detail pagina's
- Cart en checkout flow
- Stripe integratie
- Admin panel
- About & Contact pagina's
- Legal pagina's

---

**Succes met je webshop! 🎨**
