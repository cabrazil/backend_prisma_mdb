import { FastifyRequest, FastifyReply } from "fastify";
import { ListCardsBySegmentService } from "../services/ListCardsBySegmentService";

class ListCardsBySegmentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { segment, issuer } = request.query as { segment: "ENTRADA" | "ALTARENDA" | "INTERMEDIARIO", issuer: string }

    const listCardsBySegmentService = new ListCardsBySegmentService();

    const cards = await listCardsBySegmentService.execute({ segment, issuer });

    reply.send(cards)
  }
}

export { ListCardsBySegmentController }