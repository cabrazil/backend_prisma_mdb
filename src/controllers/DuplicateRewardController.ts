import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateRewardService } from "../services/DuplicateRewardService";

export const duplicateRewardHandler = async (
  request: FastifyRequest<{ Params: { rewardId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate reward:", request.params.rewardId, "with cardId:", request.body.cardId);
    const { rewardId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newreward = await duplicateRewardService(rewardId, cardId);
    reply.send(newreward);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate reward" });
  }
};
