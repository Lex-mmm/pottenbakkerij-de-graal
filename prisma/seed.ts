import { PrismaClient } from "@prisma/client";
import categories from "../data/categories.json";
import products from "../data/products.json";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("✨ Cleared existing data");

  // Seed categories
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  console.log(`✅ Created ${categories.length} categories`);

  // Seed products
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        images: JSON.stringify(product.images), // Store images as JSON string
        createdAt: new Date(product.createdAt),
      },
    });
  }
  console.log(`✅ Created ${products.length} products`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
