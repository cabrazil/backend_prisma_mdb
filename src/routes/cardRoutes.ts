import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateCardHandler } from "../controllers/DuplicateCardController";
import { ListAllCardsController } from '../controllers/ListAllCardsController'
import { ListCardsBySegmentController } from '../controllers/ListCardsBySegmentController';
import { ListCardByIdController } from '../controllers/ListCardbyIdController';
import { ListCardsByBrandController } from '../controllers/ListCardsByBrandController';
import { ListCardsByExpenseController } from "../controllers/ListCardsByExpenseController";

export default async function cardRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { cardId: string }; Body: { brandId?: string, issuerId?: string } }>(
    "/cards/duplicate/:cardId",
    duplicateCardHandler
  );

  fastify.get("/cards", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllCardsController().handle(request, reply)
  });

  fastify.get("/cardsegment", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCardsBySegmentController().handle(request, reply)
  });

  fastify.get("/cardexpense", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCardsByExpenseController().handle(request, reply)
  });

  fastify.get("/cardid", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCardByIdController().handle(request, reply)
  });

  fastify.get("/cardsbrand", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCardsByBrandController().handle(request, reply)
  });
}
