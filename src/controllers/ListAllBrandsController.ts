import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllBrandsService } from "../services/ListAllBrandsService";

class ListAllBrandsController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const listAllBrandsService = new ListAllBrandsService();
        const brands = await listAllBrandsService.execute();

        reply.send(brands)
    }
}

export { ListAllBrandsController }