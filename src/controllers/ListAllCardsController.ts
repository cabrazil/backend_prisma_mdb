import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllCardsService } from "../services/ListAllCardsService";

class ListAllCardsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listAllCardsService = new ListAllCardsService();

        const cards = await listAllCardsService.execute();

        reply.send(cards)
    }
}

export { ListAllCardsController }