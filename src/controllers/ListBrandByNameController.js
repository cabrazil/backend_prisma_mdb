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
exports.ListBrandByNameController = void 0;
const ListBrandByNameService_1 = require("../services/ListBrandByNameService");
class ListBrandByNameController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { brand, variant } = request.query;
            const listBrandByNameService = new ListBrandByNameService_1.ListBrandByNameService();
            const brandvar = yield listBrandByNameService.execute({ brand, variant });
            reply.send(brandvar);
        });
    }
}
exports.ListBrandByNameController = ListBrandByNameController;
