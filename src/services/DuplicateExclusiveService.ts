import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateExclusiveService = async (exclusiveId: string, newCardId: string) => {
  try {
    // Fetch the existing exclusive
    console.log(`🔍 Fetching exclusive with ID: ${exclusiveId}`);
    const existingexclusive = await prisma.exclusive.findUnique({
      where: { id: exclusiveId },
    });

    if (!existingexclusive) {
      console.error("❌ exclusive not found");
      throw new Error("exclusive not found");
    }

    console.log("✅ Existing exclusive found:", existingexclusive);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newexclusiveData } = existingexclusive;

    // Create the new duplicated exclusive
    const newexclusive = await prisma.exclusive.create({
      data: {
        ...newexclusiveData,
        cardId: newCardId,
      },
    });

    console.log("✅ New exclusive created:", newexclusive);

    return newexclusive;
  } catch (error) {
    console.error("Error duplicating exclusive:", error);
    throw error;
  }
};
