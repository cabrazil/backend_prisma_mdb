import { FastifyInstance } from "fastify";
import { duplicateLoungeHandler } from "../controllers/DuplicateLoungeController";

export default async function loungeRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { loungeId: string }; Body: { cardId: string } }>(
    "/lounges/duplicate/:loungeId",
    duplicateLoungeHandler
  );
}
