import { z } from "zod";

// Image schema for product images
export const ImageSchema = z.object({
  src: z.string().url(),
  alt: z.string(),
});

// Product schema
export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  priceCents: z.number().int().nonnegative(),
  images: z.array(ImageSchema).min(1),
  categoryId: z.string(),
  glaze: z.string().optional(),
  size: z.string().optional(),
  weightGrams: z.number().int().optional(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
  createdAt: z.string().or(z.date()),
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductImage = z.infer<typeof ImageSchema>;

// Category schema
export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sort: z.number().int().default(0),
});

export type Category = z.infer<typeof CategorySchema>;

// Cart item schema
export const CartItemSchema = z.object({
  productId: z.string(),
  title: z.string(),
  priceCents: z.number().int(),
  quantity: z.number().int().min(1),
  image: ImageSchema,
  slug: z.string(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// Shipping address schema
export const ShippingAddressSchema = z.object({
  name: z.string().min(2, "Naam is verplicht"),
  street: z.string().min(3, "Straatnaam is verplicht"),
  postalCode: z.string().regex(/^\d{4}\s?[A-Z]{2}$/, "Ongeldige postcode"),
  city: z.string().min(2, "Plaats is verplicht"),
  country: z.string().default("NL"),
});

export type ShippingAddress = z.infer<typeof ShippingAddressSchema>;

// Checkout form schema
export const CheckoutFormSchema = z.object({
  email: z.string().email("Ongeldig e-mailadres"),
  shippingMethod: z.enum(["pickup", "postnl-0-2kg", "postnl-2-5kg", "postnl-5-10kg"]),
  shippingAddress: ShippingAddressSchema.optional(),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "U moet akkoord gaan met de privacyverklaring",
  }),
});

export type CheckoutForm = z.infer<typeof CheckoutFormSchema>;

// Order status enum
export const OrderStatus = z.enum([
  "pending",
  "paid",
  "shipped",
  "picked-up",
  "refunded",
]);

export type OrderStatusType = z.infer<typeof OrderStatus>;
