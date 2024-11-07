import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllLoungesService } from "../services/ListAllLoungesService";

class ListAllLoungesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllLoungesService = new ListAllLoungesService();

    const lounges = await listAllLoungesService.execute();

    reply.send(lounges)
  }
}

export { ListAllLoungesController }