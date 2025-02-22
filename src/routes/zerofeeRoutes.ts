import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateZerofeeHandler } from "../controllers/DuplicateZerofeeController";
import { ListAllZerofeesControler } from '../controllers/ListAllZerofeesControler';

export default async function zerofeeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { zerofeeId: string }; Body: { cardId: string } }>(
    "/zerofees/duplicate/:zerofeeId",
    duplicateZerofeeHandler
  );

  fastify.get("/zerofees", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllZerofeesControler().handle(request, reply)
  });
}
