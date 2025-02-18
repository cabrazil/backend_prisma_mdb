import { FastifyReply, FastifyRequest } from "fastify";
import { duplicateMileageService } from "../services/DuplicateMileageService";

export const duplicateMileageHandler = async (
  request: FastifyRequest<{ Params: { mileageId: string }; Body: { cardId: string } }>,
  reply: FastifyReply
) => {
  try {
    console.log("🔄 Received request to duplicate mileage:", request.params.mileageId, "with cardId:", request.body.cardId);
    const { mileageId } = request.params;
    const { cardId } = request.body; // Optional new brandId and IssuerId

    const newmileage = await duplicateMileageService(mileageId, cardId);
    reply.send(newmileage);
  } catch (error) {
    console.error("🔥 Fastify caught error:", error);
    reply.status(500).send({ error: "Failed to duplicate mileage" });
  }
};
