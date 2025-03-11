import { FastifyRequest, FastifyReply } from "fastify";
import { ListCardsByExpenseService } from "../services/ListCardsByExpenseService";

class ListCardsByExpenseController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { expense, issuer } = request.query as { expense: number, issuer: string }

    const listCardsByExpenseService = new ListCardsByExpenseService();

    const cards = await listCardsByExpenseService.execute({ expense, issuer });

    reply.send(cards)
  }
}

export { ListCardsByExpenseController }