import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./tipovehiculo.controler.js";

export const tipoVehiculoRouter= Router()

tipoVehiculoRouter.get('/', findAll)
tipoVehiculoRouter.get('/:idTipoVehiculo', findOne)
tipoVehiculoRouter.post('/', sanitizeProvinciaInput, add)
tipoVehiculoRouter.put('/:idTipoVehiculo', sanitizeProvinciaInput, update)
tipoVehiculoRouter.patch('/:idTipoVehiculo', sanitizeProvinciaInput, update)
tipoVehiculoRouter.delete('/:idTipoVehiculo', remove)