import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateLoungeService = async (loungeId: string, newCardId: string) => {
  try {
    // Fetch the existing lounge
    console.log(`🔍 Fetching lounge with ID: ${loungeId}`);
    const existinglounge = await prisma.lounge.findUnique({
      where: { id: loungeId },
    });

    if (!existinglounge) {
      console.error("❌ lounge not found");
      throw new Error("lounge not found");
    }

    console.log("✅ Existing lounge found:", existinglounge);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newloungeData } = existinglounge;

    // Create the new duplicated lounge
    const newlounge = await prisma.lounge.create({
      data: {
        ...newloungeData,
        cardId: newCardId,
      },
    });

    console.log("✅ New lounge created:", newlounge);

    return newlounge;
  } catch (error) {
    console.error("Error duplicating lounge:", error);
    throw error;
  }
};
