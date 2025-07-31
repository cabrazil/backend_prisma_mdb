import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify';
import { CreateCustomerController } from '../controllers/CreateCustomerController';
import { ListCustomersController } from '../controllers/ListCustomersController';
import { DeleteCustomerController } from '../controllers/DeleteCustomerController';
import { ListAllBrandsController } from '../controllers/ListAllBrandsController';
import { ListBrandByNameController } from '../controllers/ListBrandByNameController';
import { ListAllIssuersController } from '../controllers/ListAllIssuersController';


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    // Health check simples
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { status: "ok", message: "Server is running" }
    })

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

    fastify.get("/brands", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllBrandsController().handle(request, reply)
    })

    fastify.get("/brandvar", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListBrandByNameController().handle(request, reply)
    })

    fastify.get("/issuers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListAllIssuersController().handle(request, reply)
    })
}

// Export default for easier importing
export default routes;