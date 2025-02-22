import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateCashbackService } from "../services/DuplicateCashbackService";

export const duplicateCashbackHandler = async (
  request: FastifyRequest<{ Params: { cashbackId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate cashback:", request.params.cashbackId, "with cardId:", request.body.cardId);
    const { cashbackId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newcashback = await duplicateCashbackService(cashbackId, cardId);
    reply.send(newcashback);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate cashback" });
  }
};
