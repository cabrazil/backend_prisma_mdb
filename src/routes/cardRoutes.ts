import { FastifyInstance } from "fastify";
import { duplicateCardHandler } from "../controllers/DuplicateCardController";

export default async function cardRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { cardId: string }; Body: { brandId?: string, issuerId?: string } }>(
    "/cards/duplicate/:cardId",
    duplicateCardHandler
  );
}
