import fs from "node:fs/promises";
import path from "node:path";

export async function listProductImages(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), "public", "images", "products");
    const files = await fs.readdir(dir);
    
    const allowed = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
    
    return files
      .filter((f) => allowed.has(path.extname(f).toLowerCase()))
      .filter((f) => !f.startsWith(".")) // Exclude .DS_Store etc
      .sort((a, b) => a.localeCompare(b))
      .map((f) => `/images/products/${f}`);
  } catch {
    return [];
  }
}
