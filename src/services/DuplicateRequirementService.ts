import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateRequirementService = async (requirementId: string, newCardId: string) => {
  try {
    // Fetch the existing requirement
    console.log(`🔍 Fetching requirement with ID: ${requirementId}`);
    const existingrequirement = await prisma.requirement.findUnique({
      where: { id: requirementId },
    });

    if (!existingrequirement) {
      console.error("❌ requirement not found");
      throw new Error("requirement not found");
    }

    console.log("✅ Existing requirement found:", existingrequirement);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, ...newrequirementData } = existingrequirement;

    // Create the new duplicated requirement
    const newrequirement = await prisma.requirement.create({
      data: {
        ...newrequirementData,
        cardId: newCardId,
      },
    });

    console.log("✅ New requirement created:", newrequirement);

    return newrequirement;
  } catch (error) {
    console.error("Error duplicating requirement:", error);
    throw error;
  }
};
