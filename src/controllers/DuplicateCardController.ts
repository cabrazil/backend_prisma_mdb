import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateCard } from "../services/DuplicateCardService";

export const duplicateCardHandler = async (
  request: FastifyRequest<{ Params: { cardId: string }; Body: { brandId?: string, issuerId?: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate card:", request.params.cardId, "with brandId:", request.body.brandId);
    const { cardId } = request.params;
    const { brandId, issuerId } = request.body; // Optional new brandId and IssuerId

    const newCard = await duplicateCard(cardId, brandId, issuerId);
    reply.send(newCard);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate card" });
  }
};
