import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllRewardsService } from "../services/ListAllRewardsService";

class ListAllRewardsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllRewardsService = new ListAllRewardsService();

    const rewards = await listAllRewardsService.execute();

    reply.send(rewards)
  }
}

export { ListAllRewardsController }