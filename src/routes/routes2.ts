import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CreateCustomerController } from '../controllers/CreateCustomerController';
import { ListCustomersController } from '../controllers/ListCustomersController';
import { DeleteCustomerController } from '../controllers/DeleteCustomerController';
import { ListAllCardsController } from '../controllers/ListAllCardsController';
import { ListAllZerofeesControler } from '../controllers/ListAllZerofeesControler';
import { ListAllRewardsController } from '../controllers/ListAllRewardsController';
import { ListAllLoungesController } from '../controllers/ListAllLoungesController';
import { ListAllMileagesController } from '../controllers/ListAllMileagesController';
import { ListAllBrandsController } from '../controllers/ListAllBrandsController';
import { ListBrandByNameController } from '../controllers/ListBrandByNameController';
import { ListCardsByBrandController } from '../controllers/ListCardsByBrandController';
import { ListCardsBySegmentController } from '../controllers/ListCardsBySegmentController';
import { ListAllIssuersController } from '../controllers/ListAllIssuersController';
import { ListCardByIdController } from '../controllers/ListCardbyIdController';

// Route handler type definition
type RouteHandler = InstanceType<
  | typeof CreateCustomerController
  | typeof ListCustomersController
  | typeof DeleteCustomerController
  | typeof ListAllCardsController
  | typeof ListAllZerofeesControler
  | typeof ListAllRewardsController
  | typeof ListAllLoungesController
  | typeof ListAllMileagesController
  | typeof ListAllBrandsController
  | typeof ListBrandByNameController
  | typeof ListCardsByBrandController
  | typeof ListCardsBySegmentController
  | typeof ListAllIssuersController
  | typeof ListCardByIdController
>['handle'];

// Route configuration interface
interface RouteConfig {
  method: 'get' | 'post' | 'delete';
  url: string;
  handler: RouteHandler;
}

// Route definitions
const routes: RouteConfig[] = [
  // Test route
  { method: 'get', url: '/teste', handler: (_, reply) => reply.send({ ok: true }) },

  // Customer routes
  { method: 'post', url: '/customers', handler: new CreateCustomerController().handle },
  { method: 'get', url: '/customers', handler: new ListCustomersController().handle },
  { method: 'delete', url: '/customers', handler: new DeleteCustomerController().handle },

  // Card-related routes
  { method: 'get', url: '/cards', handler: new ListAllCardsController().handle },
  { method: 'get', url: '/cards/zerofees', handler: new ListAllZerofeesControler().handle },
  { method: 'get', url: '/cards/rewards', handler: new ListAllRewardsController().handle },
  { method: 'get', url: '/cards/lounges', handler: new ListAllLoungesController().handle },
  { method: 'get', url: '/cards/mileages', handler: new ListAllMileagesController().handle },
  { method: 'get', url: '/cards/:id', handler: new ListCardByIdController().handle },
  { method: 'get', url: '/cards/segment/:segment', handler: new ListCardsBySegmentController().handle },

  // Brand-related routes
  { method: 'get', url: '/brands', handler: new ListAllBrandsController().handle },
  { method: 'get', url: '/brands/:name', handler: new ListBrandByNameController().handle },
  { method: 'get', url: '/brands/:brand/cards', handler: new ListCardsByBrandController().handle },

  // Issuer routes
  { method: 'get', url: '/issuers', handler: new ListAllIssuersController().handle },
];

export async function registerRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Register all routes
  routes.forEach(({ method, url, handler }) => {
    fastify[method](url, async (request, reply) => {
      try {
        return await handler(request, reply);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    });
  });
}

// Export default for easier importing
export default registerRoutes;