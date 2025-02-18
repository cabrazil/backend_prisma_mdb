import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateExclusiveService } from "../services/DuplicateExclusiveService";

export const duplicateExclusiveHandler = async (
  request: FastifyRequest<{ Params: { exclusiveId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate exclusive:", request.params.exclusiveId, "with cardId:", request.body.cardId);
    const { exclusiveId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newexclusive = await duplicateExclusiveService(exclusiveId, cardId);
    reply.send(newexclusive);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate exclusive" });
  }
};
