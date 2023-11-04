import { Router } from "express";
import { sanitizeSucursalInput, findAll, findOne, add, update, remove } from "./sucursal.controler.js";

export const sucursalRouter= Router()

sucursalRouter.get('/', findAll) /*LA RUTA ES GENERICA, DARLE USOS EN OTRAS PARTES DE LA APP */
sucursalRouter.get('/:id', findOne)
sucursalRouter.post('/', sanitizeSucursalInput, add)
sucursalRouter.put('/:id', sanitizeSucursalInput, update)
sucursalRouter.patch('/:id', sanitizeSucursalInput, update)
sucursalRouter.delete('/:id', remove)