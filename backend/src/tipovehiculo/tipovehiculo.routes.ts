import { Router } from "express";
import { sanitizeTipoVehiculoInput, findAll, findOne, findFilter, add, update, remove } from "./tipovehiculo.controler.js";

export const tipoVehiculoRouter= Router()

tipoVehiculoRouter.get('/', findAll)
tipoVehiculoRouter.get('/:id', findOne)
tipoVehiculoRouter.post('/', sanitizeTipoVehiculoInput, add)
tipoVehiculoRouter.put('/:id', sanitizeTipoVehiculoInput, update)
tipoVehiculoRouter.patch('/:id', sanitizeTipoVehiculoInput, update)
tipoVehiculoRouter.delete('/:id', remove)

tipoVehiculoRouter.get('/:id/vehiculo', findFilter)