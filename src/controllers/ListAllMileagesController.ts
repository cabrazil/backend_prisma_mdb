import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllMileagesService } from "../services/ListAllMileagesService";

class ListAllMileagesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listAllMileagesService = new ListAllMileagesService();

    const mileages = await listAllMileagesService.execute();

    reply.send(mileages)
  }
}

export { ListAllMileagesController }