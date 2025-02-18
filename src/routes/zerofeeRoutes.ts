import { FastifyInstance } from "fastify";
import { duplicateZerofeeHandler } from "../controllers/DuplicateZerofeeController";

export default async function zerofeeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { zerofeeId: string }; Body: { cardId: string } }>(
    "/zerofees/duplicate/:zerofeeId",
    duplicateZerofeeHandler
  );
}
