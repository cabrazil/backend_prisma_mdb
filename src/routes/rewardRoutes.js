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
exports.default = rewardRoutes;
const DuplicateRewardController_1 = require("../controllers/DuplicateRewardController");
const ListAllRewardsController_1 = require("../controllers/ListAllRewardsController");
function rewardRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.post("/rewards/duplicate/:rewardId", DuplicateRewardController_1.duplicateRewardHandler);
        fastify.get("/rewards", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            return new ListAllRewardsController_1.ListAllRewardsController().handle(request, reply);
        }));
    });
}
