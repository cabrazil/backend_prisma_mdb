import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateCashbackHandler } from "../controllers/DuplicateCashbackController";
import { ListAllCashbacksController } from '../controllers/ListAllCashbacksController';

export default async function cashbackRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { cashbackId: string }; Body: { cardId: string } }>(
    "/cashbacks/duplicate/:cashbackId",
    duplicateCashbackHandler
  );

  fastify.get("/cashbacks", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllCashbacksController().handle(request, reply)
  });
}
