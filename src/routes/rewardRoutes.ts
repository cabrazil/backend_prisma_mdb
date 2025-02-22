import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateRewardHandler } from "../controllers/DuplicateRewardController";
import { ListAllRewardsController } from '../controllers/ListAllRewardsController';

export default async function rewardRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { rewardId: string }; Body: { cardId: string } }>(
    "/rewards/duplicate/:rewardId",
    duplicateRewardHandler
  );

  fastify.get("/rewards", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllRewardsController().handle(request, reply)
  })
}
