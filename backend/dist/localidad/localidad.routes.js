import { Router } from "express";
import { sanitizeLocalidadInput, findAll, findOne, add, update, remove } from "./localidad.controler.js";
import { validateToken } from "../shared/accessToken.js";
export const localidadRouter = Router();
localidadRouter.get('/', findAll);
localidadRouter.get('/:id', findOne);
localidadRouter.post('/', validateToken, sanitizeLocalidadInput, add);
localidadRouter.put('/:id', validateToken, sanitizeLocalidadInput, update);
localidadRouter.patch('/:id', validateToken, sanitizeLocalidadInput, update);
localidadRouter.delete('/:id', validateToken, remove);
//# sourceMappingURL=localidad.routes.js.map