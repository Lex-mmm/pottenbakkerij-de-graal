import fs from "node:fs/promises";
import path from "node:path";

const ALLOWED = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export type ImagePath = string; // e.g. /images/atelier/foo.jpg

async function listDirSafe(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir);
    return entries;
  } catch {
    return [];
  }
}

/**
 * Lists images inside public/images/<subdir> and returns web paths
 * e.g. listPublicImages("atelier") => ["/images/atelier/a.jpg", "/images/atelier/b.png"]
 */
export async function listPublicImages(subdir: "atelier" | "production"): Promise<ImagePath[]> {
  const dir = path.join(process.cwd(), "public", "images", subdir);
  const files = await listDirSafe(dir);
  const filtered = files
    .filter((f) => ALLOWED.has(path.extname(f).toLowerCase()))
    // Simple sort by filename to have a deterministic order
    .sort((a, b) => a.localeCompare(b));
  return filtered.map((f) => path.posix.join("/images", subdir, f));
}

/**
 * Picks a single image from a folder (first by filename) as hero
 */
export async function pickHeroImage(subdir: "atelier" | "production"): Promise<ImagePath | null> {
  const imgs = await listPublicImages(subdir);
  return imgs[0] ?? null;
}

/**
 * Ensures a public image path exists on disk. If not, returns a fallback path.
 * Accepts paths like "/images/products/foo.jpg".
 */
export async function ensurePublicImage(src: string, fallback: string = "/images/placeholder-product.svg"): Promise<ImagePath> {
  try {
    const webPath = src.startsWith("/") ? src.slice(1) : src; // remove leading slash
    const full = path.join(process.cwd(), "public", webPath);
    const stat = await fs.stat(full);
    if (stat.isFile()) return src;
  } catch {
    // ignore
  }
  return fallback;
}
