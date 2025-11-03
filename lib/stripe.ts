import Stripe from "stripe";

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
  }
  return new Stripe(key, {
    apiVersion: "2025-10-29.clover",
    typescript: true,
  });
}

export const STRIPE_CONFIG = {
  currency: "eur",
  paymentMethods: ["card", "ideal"],
  allowedCountries: ["NL", "BE", "DE", "FR", "LU"],
} as const;
