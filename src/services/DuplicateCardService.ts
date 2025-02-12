import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const duplicateCard = async (cardId: string, newBrandId?: string, newIssuerId?: string) => {
  try {
    // Fetch the existing cardnewIssuerId
    console.log(`🔍 Fetching card with ID: ${cardId}`);
    const existingCard = await prisma.card.findUnique({
      where: { id: cardId },
    });

    if (!existingCard) {
      console.error("❌ Card not found");
      throw new Error("Card not found");
    }

    console.log("✅ Existing card found:", existingCard);

    // Remove `id` and `created_at` to allow Prisma to generate new values
    const { id, brandId, issuerId, ...newCardData } = existingCard;

    // Create the new duplicated card
    const newCard = await prisma.card.create({
      data: {
        ...newCardData,
        brandId: newBrandId || brandId, // Use the provided brandId or keep the original
        issuerId: newIssuerId || issuerId, // Use the provided brandId or keep the original
        //created_at: new Date(), // Ensure a new timestamp
        //updated_at: new Date(), // Ensure a new timestamp
      },
    });

    console.log("✅ New card created:", newCard);

    return newCard;
  } catch (error) {
    console.error("Error duplicating card:", error);
    throw error;
  }
};
