/**
 * Format cents to EUR currency string with Dutch locale
 * @param cents - Price in cents
 * @returns Formatted price string (e.g., "€ 18,50")
 */
export function formatPrice(cents: number): string {
  const euros = cents / 100;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(euros);
}

/**
 * Format date with Dutch locale
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("nl-NL", options).format(dateObj);
}

/**
 * Calculate shipping cost based on weight
 * @param weightGrams - Total weight in grams
 * @returns Shipping cost in cents
 */
export function calculateShipping(weightGrams: number): {
  method: string;
  cost: number;
} {
  if (weightGrams <= 2000) {
    return { method: "postnl-0-2kg", cost: 695 }; // €6,95
  } else if (weightGrams <= 5000) {
    return { method: "postnl-2-5kg", cost: 895 }; // €8,95
  } else if (weightGrams <= 10000) {
    return { method: "postnl-5-10kg", cost: 1295 }; // €12,95
  }
  return { method: "custom", cost: 0 }; // Custom quote needed
}

/**
 * Get shipping method display name
 */
export function getShippingMethodName(method: string): string {
  const methods: Record<string, string> = {
    pickup: "Afhalen in atelier (gratis)",
    "postnl-0-2kg": "PostNL (0-2 kg) - €6,95",
    "postnl-2-5kg": "PostNL (2-5 kg) - €8,95",
    "postnl-5-10kg": "PostNL (5-10 kg) - €12,95",
  };
  return methods[method] || method;
}

/**
 * Get order status display name in Dutch
 */
export function getOrderStatusName(status: string): string {
  const statuses: Record<string, string> = {
    pending: "In afwachting",
    paid: "Betaald",
    shipped: "Verzonden",
    "picked-up": "Afgehaald",
    refunded: "Geretourneerd",
  };
  return statuses[status] || status;
}

/**
 * Get stock badge text and variant
 */
export function getStockBadge(stock: number): {
  text: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} {
  if (stock === 0) {
    return { text: "Uitverkocht", variant: "destructive" };
  } else if (stock <= 2) {
    return { text: `Nog ${stock} op voorraad`, variant: "secondary" };
  } else if (stock <= 5) {
    return { text: "Beperkte voorraad", variant: "outline" };
  }
  return { text: "Op voorraad", variant: "default" };
}

/**
 * Create a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Truncate text to a maximum length
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
