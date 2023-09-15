import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./usuario.controler.js";
export const usuarioRouter = Router();
usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOne);
usuarioRouter.post('/', sanitizeProvinciaInput, add);
usuarioRouter.put('/:id', sanitizeProvinciaInput, update);
usuarioRouter.patch('/:id', sanitizeProvinciaInput, update);
usuarioRouter.delete('/:id', remove);
//# sourceMappingURL=usuario.routes.js.map