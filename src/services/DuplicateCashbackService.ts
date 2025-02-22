import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateCashbackService = async (cashbackId: string, newCardId: string) => {
  try {
    // Fetch the existing cashback
    console.log(`🔍 Fetching cashback with ID: ${cashbackId}`);
    const existingcashback = await prisma.cashback.findUnique({
      where: { id: cashbackId },
    });

    if (!existingcashback) {
      console.error("❌ cashback not found");
      throw new Error("cashback not found");
    }

    console.log("✅ Existing cashback found:", existingcashback);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newcashbackData } = existingcashback;

    // Create the new duplicated cashback
    const newcashback = await prisma.cashback.create({
      data: {
        ...newcashbackData,
        cardId: newCardId,
      },
    });

    console.log("✅ New cashback created:", newcashback);

    return newcashback;
  } catch (error) {
    console.error("Error duplicating cashback:", error);
    throw error;
  }
};
