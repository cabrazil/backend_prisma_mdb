import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { duplicateMileageHandler } from "../controllers/DuplicateMileageController";
import { ListAllMileagesController } from '../controllers/ListAllMileagesController';

export default async function mileageRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { mileageId: string }; Body: { cardId: string } }>(
    "/mileages/duplicate/:mileageId",
    duplicateMileageHandler
  );

  fastify.get("/mileages", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListAllMileagesController().handle(request, reply)
  })
}
