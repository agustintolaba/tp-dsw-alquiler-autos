import { Router } from "express";
import { sanitizeAlquilerInput, findAll, findOne, add, update, remove } from "./alquiler.controler.js";

export const alquilerRouter= Router()

alquilerRouter.get('/', findAll) 
alquilerRouter.get('/:id', findOne)
alquilerRouter.post('/', sanitizeAlquilerInput, add)
alquilerRouter.put('/:id', sanitizeAlquilerInput, update)
alquilerRouter.patch('/:id', sanitizeAlquilerInput, update)
alquilerRouter.delete('/:id', remove)