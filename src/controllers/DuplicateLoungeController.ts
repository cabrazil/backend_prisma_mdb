import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateLoungeService } from "../services/DuplicateLoungeService";

export const duplicateLoungeHandler = async (
  request: FastifyRequest<{ Params: { loungeId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate lounge:", request.params.loungeId, "with cardId:", request.body.cardId);
    const { loungeId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newlounge = await duplicateLoungeService(loungeId, cardId);
    reply.send(newlounge);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate lounge" });
  }
};
