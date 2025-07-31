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
exports.ListAllLoungesController = void 0;
const ListAllLoungesService_1 = require("../services/ListAllLoungesService");
class ListAllLoungesController {
    handle(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const listAllLoungesService = new ListAllLoungesService_1.ListAllLoungesService();
            const lounges = yield listAllLoungesService.execute();
            reply.send(lounges);
        });
    }
}
exports.ListAllLoungesController = ListAllLoungesController;
