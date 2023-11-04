import { Router } from "express";
import { sanitizeSeguroInput, findAll, findOne, add, update, remove } from "./seguro.controler.js";

export const seguroRouter= Router()

seguroRouter.get('/', findAll) 
seguroRouter.get('/:id', findOne)
seguroRouter.post('/', sanitizeSeguroInput, add)
seguroRouter.put('/:id', sanitizeSeguroInput, update)
seguroRouter.patch('/:id', sanitizeSeguroInput, update)
seguroRouter.delete('/:id', remove) 