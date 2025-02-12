import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateRewardService = async (rewardId: string, newCardId: string) => {
  try {
    // Fetch the existing rewardnewIssuerId
    console.log(`🔍 Fetching reward with ID: ${rewardId}`);
    const existingreward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!existingreward) {
      console.error("❌ reward not found");
      throw new Error("reward not found");
    }

    console.log("✅ Existing reward found:", existingreward);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newrewardData } = existingreward;

    // Create the new duplicated reward
    const newreward = await prisma.reward.create({
      data: {
        ...newrewardData,
        cardId: newCardId,
      },
    });

    console.log("✅ New reward created:", newreward);

    return newreward;
  } catch (error) {
    console.error("Error duplicating reward:", error);
    throw error;
  }
};
