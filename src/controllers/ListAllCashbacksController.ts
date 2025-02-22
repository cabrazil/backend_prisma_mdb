import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCashbacksService } from "../services/ListAllCashbacksService";

class ListAllCashbacksController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllCashbacksService = new ListAllCashbacksService();

    const cashbacks = await listAllCashbacksService.execute();

    reply.send(cashbacks)
  }
}

export { ListAllCashbacksController }