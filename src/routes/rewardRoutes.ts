import { FastifyInstance } from "fastify";
import { duplicateRewardHandler } from "../controllers/DuplicateRewardController";

export default async function rewardRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { rewardId: string }; Body: { cardId: string } }>(
    "/rewards/duplicate/:rewardId",
    duplicateRewardHandler
  );
}
