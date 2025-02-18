import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateMileageService = async (mileageId: string, newCardId: string) => {
  try {
    // Fetch the existing mileage
    console.log(`🔍 Fetching mileage with ID: ${mileageId}`);
    const existingmileage = await prisma.mileage.findUnique({
      where: { id: mileageId },
    });

    if (!existingmileage) {
      console.error("❌ mileage not found");
      throw new Error("mileage not found");
    }

    console.log("✅ Existing mileage found:", existingmileage);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newmileageData } = existingmileage;

    // Create the new duplicated mileage
    const newmileage = await prisma.mileage.create({
      data: {
        ...newmileageData,
        cardId: newCardId,
      },
    });

    console.log("✅ New mileage created:", newmileage);

    return newmileage;
  } catch (error) {
    console.error("Error duplicating mileage:", error);
    throw error;
  }
};
