import { FastifyInstance } from "fastify";
import { duplicateMileageHandler } from "../controllers/DuplicateMileageController";

export default async function mileageRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: { mileageId: string }; Body: { cardId: string } }>(
    "/mileages/duplicate/:mileageId",
    duplicateMileageHandler
  );
}
