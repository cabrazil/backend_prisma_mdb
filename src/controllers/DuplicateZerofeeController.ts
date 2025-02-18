import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateZerofeeService } from "../services/DuplicateZerofeeService";

export const duplicateZerofeeHandler = async (
  request: FastifyRequest<{ Params: { zerofeeId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate zerofee:", request.params.zerofeeId, "with cardId:", request.body.cardId);
    const { zerofeeId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newzerofee = await duplicateZerofeeService(zerofeeId, cardId);
    reply.send(newzerofee);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate zerofee" });
  }
};
