import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { ListCustomersController } from './controllers/ListCustomersController';
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { ListAllCardsController } from './controllers/ListAllCardsController'
import { ListAllZerofeesControler } from './controllers/ListAllZerofeesControler';
import { ListAllRewardsController } from './controllers/ListAllRewardsController';
import { ListAllLoungesController } from './controllers/ListAllLoungesController';
import { ListAllMileagesController } from './controllers/ListAllMileagesController';
import { ListAllBrandsController } from './controllers/ListAllBrandsController';
import { ListBrandByNameController } from './controllers/ListBrandByNameController';
import { ListCardsByBrandController } from './controllers/ListCardsByBrandController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply)
    })

    fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomersController().handle(request, reply)
    })

    fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteCustomerController().handle(request, reply)
    })

    fastify.get("/cards", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllCardsController().handle(request, reply)
    })

    fastify.get("/zerofees", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllZerofeesControler().handle(request, reply)
    })

    fastify.get("/rewards", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllRewardsController().handle(request, reply)
    })

    fastify.get("/lounges", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllLoungesController().handle(request, reply)
    })

    fastify.get("/mileages", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllMileagesController().handle(request, reply)
    })

    fastify.get("/brands", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllBrandsController().handle(request, reply)
    })

    fastify.get("/brandvar", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListBrandByNameController().handle(request, reply)
    })

    fastify.get("/cardsbrand", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCardsByBrandController().handle(request, reply)
    })
}