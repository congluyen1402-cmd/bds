import { PrismaClient } from "@prisma/client";
import { unstable_cache } from "next/cache";

const prisma = new PrismaClient();

export const getSiteImages = unstable_cache(
  async () => {
    try {
      const images = await prisma.siteImage.findMany();
      // Convert array to a keyed dictionary for easier lookup
      const dict: Record<string, any> = {};
      images.forEach(img => {
        dict[img.slotKey] = img;
      });
      return dict;
    } catch (e) {
      console.error("Failed to fetch site images", e);
      return {};
    }
  },
  ["site-images"],
  { revalidate: 3600, tags: ["site-images"] }
);
