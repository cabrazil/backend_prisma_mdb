import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifySchema,
  FastifyRequest,
  FastifyReply,
  RouteOptions
} from 'fastify';
import { duplicateRewardHandler } from '../controllers/DuplicateRewardController';
import { ListAllRewardsController } from '../controllers/ListAllRewardsController';

// Define specific request interface for duplicate reward
interface DuplicateRewardRequest {
  Params: { rewardId: string };
  Body: { cardId: string };
}

// Route handler type definition with specific typing
type RouteHandler =
  | ((request: FastifyRequest<DuplicateRewardRequest>, reply: FastifyReply) => Promise<any>)
  | ((request: FastifyRequest, reply: FastifyReply) => Promise<any>); // For generic GET request

// Route configuration interface
interface RouteConfig {
  method: 'get' | 'post';
  url: string;
  handler: RouteHandler;
  schema?: FastifySchema;
}

// Schema for duplicate reward endpoint
const duplicateRewardSchema: FastifySchema = {
  params: {
    type: 'object',
    required: ['rewardId'],
    properties: {
      rewardId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    required: ['cardId'],
    properties: {
      cardId: { type: 'string' },
    },
  },
};

// Route definitions with explicit typing
const routes: RouteConfig[] = [
  {
    method: 'post',
    url: '/rewards/duplicate/:rewardId',
    handler: duplicateRewardHandler, // TypeScript knows this expects DuplicateRewardRequest
    schema: duplicateRewardSchema,
  },
  {
    method: 'get',
    url: '/rewards',
    handler: new ListAllRewardsController().handle, // Uses generic FastifyRequest
  },
];

export async function registerRewardRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  routes.forEach(({ method, url, handler, schema }) => {
    const routeOptions: RouteOptions = {
      method: method.toUpperCase() as 'GET' | 'POST',
      url,
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          // Handle the POST route with specific typing
          if (method === 'post' && url === '/rewards/duplicate/:rewardId') {
            return await (handler as (req: FastifyRequest<DuplicateRewardRequest>, rep: FastifyReply) => Promise<any>)(
              request as FastifyRequest<DuplicateRewardRequest>,
              reply
            );
          }
          // Handle the GET route with generic typing
          return await (handler as (req: FastifyRequest, rep: FastifyReply) => Promise<any>)(
            request,
            reply
          );
        } catch (error) {
          fastify.log.error(error);
          return reply.status(500).send({ error: 'Internal Server Error' });
        }
      },
      schema,
    };

    fastify.route(routeOptions);
  });
}

export default registerRewardRoutes;