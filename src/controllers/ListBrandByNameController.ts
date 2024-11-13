import { FastifyRequest, FastifyReply } from "fastify";
import { ListBrandByNameService } from "../services/ListBrandByNameService";

class ListBrandByNameController {
  async handle(request: FastifyRequest, reply: FastifyReply) {

    const { brand, variant } = request.query as { brand: string, variant: string }

    const listBrandByNameService = new ListBrandByNameService();
    const brandvar = await listBrandByNameService.execute({ brand, variant });

    reply.send(brandvar)
  }
}

export { ListBrandByNameController }