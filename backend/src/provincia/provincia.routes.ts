import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./provincia.controler.js";

export const provinciaRouter= Router()

provinciaRouter.get('/', findAll) /*LA RUTA ES GENERICA, DARLE USOS EN OTRAS PARTES DE LA APP */
provinciaRouter.get('/:idProvincia', findOne)
provinciaRouter.post('/', sanitizeProvinciaInput, add)
provinciaRouter.put('/:idProvincia', sanitizeProvinciaInput, update)
provinciaRouter.patch('/:idProvincia', sanitizeProvinciaInput, update)
provinciaRouter.delete('/:idProvincia', remove)
