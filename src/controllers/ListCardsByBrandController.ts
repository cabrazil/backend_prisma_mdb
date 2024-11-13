import { FastifyRequest, FastifyReply } from "fastify";
import { ListCardsByBrandService } from "../services/ListCardsByBrandService";

class ListCardsByBrandController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { brand } = request.query as { brand: string }

        const listCardsByBrandService = new ListCardsByBrandService();

        const cards = await listCardsByBrandService.execute({ brand });

        reply.send(cards)
    }
}

export { ListCardsByBrandController }