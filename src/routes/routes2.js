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
exports.registerRoutes = registerRoutes;
const CreateCustomerController_1 = require("../controllers/CreateCustomerController");
const ListCustomersController_1 = require("../controllers/ListCustomersController");
const DeleteCustomerController_1 = require("../controllers/DeleteCustomerController");
const ListAllCardsController_1 = require("../controllers/ListAllCardsController");
const ListAllZerofeesControler_1 = require("../controllers/ListAllZerofeesControler");
const ListAllRewardsController_1 = require("../controllers/ListAllRewardsController");
const ListAllLoungesController_1 = require("../controllers/ListAllLoungesController");
const ListAllMileagesController_1 = require("../controllers/ListAllMileagesController");
const ListAllBrandsController_1 = require("../controllers/ListAllBrandsController");
const ListBrandByNameController_1 = require("../controllers/ListBrandByNameController");
const ListCardsByBrandController_1 = require("../controllers/ListCardsByBrandController");
const ListCardsBySegmentController_1 = require("../controllers/ListCardsBySegmentController");
const ListAllIssuersController_1 = require("../controllers/ListAllIssuersController");
const ListCardbyIdController_1 = require("../controllers/ListCardbyIdController");
// Route definitions
const routes = [
    // Test route
    { method: 'get', url: '/teste', handler: (_, reply) => __awaiter(void 0, void 0, void 0, function* () { return reply.send({ ok: true }); }) },
    // Customer routes
    { method: 'post', url: '/customers', handler: new CreateCustomerController_1.CreateCustomerController().handle },
    { method: 'get', url: '/customers', handler: new ListCustomersController_1.ListCustomersController().handle },
    { method: 'delete', url: '/customers', handler: new DeleteCustomerController_1.DeleteCustomerController().handle },
    // Card-related routes
    { method: 'get', url: '/cards', handler: new ListAllCardsController_1.ListAllCardsController().handle },
    { method: 'get', url: '/cards/zerofees', handler: new ListAllZerofeesControler_1.ListAllZerofeesControler().handle },
    { method: 'get', url: '/cards/rewards', handler: new ListAllRewardsController_1.ListAllRewardsController().handle },
    { method: 'get', url: '/cards/lounges', handler: new ListAllLoungesController_1.ListAllLoungesController().handle },
    { method: 'get', url: '/cards/mileages', handler: new ListAllMileagesController_1.ListAllMileagesController().handle },
    { method: 'get', url: '/cards/:id', handler: new ListCardbyIdController_1.ListCardByIdController().handle },
    { method: 'get', url: '/cards/segment/:segment', handler: new ListCardsBySegmentController_1.ListCardsBySegmentController().handle },
    // Brand-related routes
    { method: 'get', url: '/brands', handler: new ListAllBrandsController_1.ListAllBrandsController().handle },
    { method: 'get', url: '/brands/:name', handler: new ListBrandByNameController_1.ListBrandByNameController().handle },
    { method: 'get', url: '/brands/:brand/cards', handler: new ListCardsByBrandController_1.ListCardsByBrandController().handle },
    // Issuer routes
    { method: 'get', url: '/issuers', handler: new ListAllIssuersController_1.ListAllIssuersController().handle },
];
function registerRoutes(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Register all routes
        routes.forEach(({ method, url, handler }) => {
            fastify[method](url, (request, reply) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield handler(request, reply);
                }
                catch (error) {
                    fastify.log.error(error);
                    return reply.status(500).send({ error: 'Internal Server Error' });
                }
            }));
        });
    });
}
// Export default for easier importing
exports.default = registerRoutes;
