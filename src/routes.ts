import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { ListCustomersController } from './controllers/ListCustomersController';
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { ListAllCardsController } from './controllers/ListAllCardsController'
import { ListAllZerofeesControler } from './controllers/ListAllZerofeesControler';

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
}