import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCardsService } from "../services/ListAllCardsService";

class ListAllCardsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listAllCardsService = new ListAllCardsService();

        const minicards = await listAllCardsService.execute();

        reply.send(minicards)
    }
}

export { ListAllCardsController }