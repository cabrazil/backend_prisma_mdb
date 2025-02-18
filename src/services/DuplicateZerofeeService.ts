import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateZerofeeService = async (zerofeeId: string, newCardId: string) => {
  try {
    // Fetch the existing zerofee
    console.log(`🔍 Fetching zerofee with ID: ${zerofeeId}`);
    const existingzerofee = await prisma.zeroFee.findUnique({
      where: { id: zerofeeId },
    });

    if (!existingzerofee) {
      console.error("❌ zerofee not found");
      throw new Error("zerofee not found");
    }

    console.log("✅ Existing zerofee found:", existingzerofee);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newzerofeeData } = existingzerofee;

    // Create the new duplicated zerofee
    const newzerofee = await prisma.zeroFee.create({
      data: {
        ...newzerofeeData,
        CardId: newCardId,
      },
    });

    console.log("✅ New zerofee created:", newzerofee);

    return newzerofee;
  } catch (error) {
    console.error("Error duplicating zerofee:", error);
    throw error;
  }
};
