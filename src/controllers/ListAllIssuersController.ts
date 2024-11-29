import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllIssuersService } from "../services/ListAllIssuersService";

class ListAllIssuersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllIssuersService = new ListAllIssuersService();
    const issuers = await listAllIssuersService.execute();

    reply.send(issuers)
  }
}

export { ListAllIssuersController }