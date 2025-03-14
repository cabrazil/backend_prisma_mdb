import { FastifyInstance } from "fastify";
import { duplicateRequirementHandler } from "../controllers/DuplicateRequirementController";

export default async function requirementRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { requirementId: string }; Body: { cardId: string } }>(
    "/requirements/duplicate/:requirementId",
    duplicateRequirementHandler
  );
}
