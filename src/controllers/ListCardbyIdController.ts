import { FastifyRequest, FastifyReply } from "fastify";
import { ListCardByIdService } from "../services/ListCardByIdService";

class ListCardByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    const listCardsBySegmentService = new ListCardByIdService();

    const cards = await listCardsBySegmentService.execute({ id });

    reply.send(cards)
  }
}

export { ListCardByIdController }