import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllZerofeesService } from "../services/ListAllZerofeesService";

class ListAllZerofeesControler {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllZerofeesService = new ListAllZerofeesService();

    const zerofees = await listAllZerofeesService.execute();

    reply.send(zerofees)
  }
}

export { ListAllZerofeesControler }