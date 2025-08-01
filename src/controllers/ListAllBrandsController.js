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
exports.ListAllBrandsController = void 0;
const ListAllBrandsService_1 = require("../services/ListAllBrandsService");
class ListAllBrandsController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAllBrandsService = new ListAllBrandsService_1.ListAllBrandsService();
            const brands = yield listAllBrandsService.execute();
            reply.send(brands);
        });
    }
}
exports.ListAllBrandsController = ListAllBrandsController;
