import { FastifyInstance } from "fastify";
import { duplicateExclusiveHandler } from "../controllers/DuplicateExclusiveController";

export default async function exclusiveRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { exclusiveId: string }; Body: { cardId: string } }>(
    "/exclusives/duplicate/:exclusiveId",
    duplicateExclusiveHandler
  );
}
