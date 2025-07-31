"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRewardRoutes = registerRewardRoutes;
const DuplicateRewardController_1 = require("../controllers/DuplicateRewardController");
const ListAllRewardsController_1 = require("../controllers/ListAllRewardsController");
// Schema for duplicate reward endpoint
const duplicateRewardSchema = {
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
const routes = [
    {
        method: 'post',
        url: '/rewards/duplicate/:rewardId',
        handler: DuplicateRewardController_1.duplicateRewardHandler, // TypeScript knows this expects DuplicateRewardRequest
        schema: duplicateRewardSchema,
    },
    {
        method: 'get',
        url: '/rewards',
        handler: new ListAllRewardsController_1.ListAllRewardsController().handle, // Uses generic FastifyRequest
    },
];
function registerRewardRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        routes.forEach(({ method, url, handler, schema }) => {
            const routeOptions = {
                method: method.toUpperCase(),
                url,
                handler: (request, reply) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        // Handle the POST route with specific typing
                        if (method === 'post' && url === '/rewards/duplicate/:rewardId') {
                            return yield handler(request, reply);
                        }
                        // Handle the GET route with generic typing
                        return yield handler(request, reply);
                    }
                    catch (error) {
                        fastify.log.error(error);
                        return reply.status(500).send({ error: 'Internal Server Error' });
                    }
                }),
                schema,
            };
            fastify.route(routeOptions);
        });
    });
}
exports.default = registerRewardRoutes;
