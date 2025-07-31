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
exports.default = cardRoutes;
const DuplicateCardController_1 = require("../controllers/DuplicateCardController");
const ListAllCardsController_1 = require("../controllers/ListAllCardsController");
const ListCardsBySegmentController_1 = require("../controllers/ListCardsBySegmentController");
const ListCardbyIdController_1 = require("../controllers/ListCardbyIdController");
const ListCardsByBrandController_1 = require("../controllers/ListCardsByBrandController");
const ListCardsByExpenseController_1 = require("../controllers/ListCardsByExpenseController");
function cardRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/cards/duplicate/:cardId", DuplicateCardController_1.duplicateCardHandler);
        fastify.get("/cards", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListAllCardsController_1.ListAllCardsController().handle(request, reply);
        }));
        fastify.get("/cardsegment", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCardsBySegmentController_1.ListCardsBySegmentController().handle(request, reply);
        }));
        fastify.get("/cardexpense", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCardsByExpenseController_1.ListCardsByExpenseController().handle(request, reply);
        }));
        fastify.get("/cardid", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCardbyIdController_1.ListCardByIdController().handle(request, reply);
        }));
        fastify.get("/cardsbrand", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListCardsByBrandController_1.ListCardsByBrandController().handle(request, reply);
        }));
    });
}
