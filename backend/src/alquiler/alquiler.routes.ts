import { Router } from "express";
import { sanitizeAlquilerInput, getAll, findOne, add, update, remove } from "./alquiler.controler.js";
import { validateToken } from "../shared/accessToken.js";

export const alquilerRouter= Router()

alquilerRouter.get('/getAll', validateToken, getAll) 
alquilerRouter.get('/:id', findOne)
alquilerRouter.post('/', sanitizeAlquilerInput, add)
alquilerRouter.put('/:id', sanitizeAlquilerInput, update)
alquilerRouter.patch('/:id', sanitizeAlquilerInput, update)
alquilerRouter.delete('/:id', remove)