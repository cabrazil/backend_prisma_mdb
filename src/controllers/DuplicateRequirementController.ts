import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateRequirementService } from "../services/DuplicateRequirementService";

export const duplicateRequirementHandler = async (
  request: FastifyRequest<{ Params: { requirementId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate requirement:", request.params.requirementId, "with cardId:", request.body.cardId);
    const { requirementId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newrequirement = await duplicateRequirementService(requirementId, cardId);
    reply.send(newrequirement);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate requirement" });
  }
};
