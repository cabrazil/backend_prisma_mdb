import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateLoungeHandler } from "../controllers/DuplicateLoungeController";
import { ListAllLoungesController } from '../controllers/ListAllLoungesController';

export default async function loungeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { loungeId: string }; Body: { cardId: string } }>(
    "/lounges/duplicate/:loungeId",
    duplicateLoungeHandler
  );

  fastify.get("/lounges", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllLoungesController().handle(request, reply)
  })
}
