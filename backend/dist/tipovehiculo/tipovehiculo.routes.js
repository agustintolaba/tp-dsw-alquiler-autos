import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./tipovehiculo.controler.js";
export const tipoVehiculoRouter = Router();
tipoVehiculoRouter.get('/', findAll);
tipoVehiculoRouter.get('/:id', findOne);
tipoVehiculoRouter.post('/', sanitizeProvinciaInput, add);
tipoVehiculoRouter.put('/:id', sanitizeProvinciaInput, update);
tipoVehiculoRouter.patch('/:id', sanitizeProvinciaInput, update);
tipoVehiculoRouter.delete('/:id', remove);
//# sourceMappingURL=tipovehiculo.routes.js.map