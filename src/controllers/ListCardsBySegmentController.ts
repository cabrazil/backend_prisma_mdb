import { FastifyRequest, FastifyReply } from "fastify";
import { ListCardsBySegmentService } from "../services/ListCardsBySegmentService";

class ListCardsBySegmentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { segment } = request.query as { segment: "ENTRADA" | "ALTARENDA" | "INTERMEDIARIO" }

    const listCardsBySegmentService = new ListCardsBySegmentService();

    const cards = await listCardsBySegmentService.execute({ segment });

    reply.send(cards)
  }
}

export { ListCardsBySegmentController }