import { Router } from "express";
import { sanitizeTipoUsuarioInput, findAll, findOne, add, update, remove, isAdmin } from "./tipousuario.controler.js";
import { validateToken } from "../shared/accessToken.js";
export const tipoUsuarioRouter = Router();
tipoUsuarioRouter.get('/find', findAll);
tipoUsuarioRouter.get('/find/:id', findOne);
tipoUsuarioRouter.get('/verifyAdmin', validateToken, isAdmin);
tipoUsuarioRouter.post('/', sanitizeTipoUsuarioInput, add);
tipoUsuarioRouter.put('/:id', sanitizeTipoUsuarioInput, update);
tipoUsuarioRouter.patch('/:id', sanitizeTipoUsuarioInput, update);
tipoUsuarioRouter.delete('/:id', remove);
//# sourceMappingURL=tipousuario.routes.js.map