import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./seguro.controler.js";

export const seguroRouter= Router()

seguroRouter.get('/', findAll) 
seguroRouter.get('/:id', findOne)
seguroRouter.post('/', sanitizeProvinciaInput, add)
seguroRouter.put('/:id', sanitizeProvinciaInput, update)
seguroRouter.patch('/:id', sanitizeProvinciaInput, update)
seguroRouter.delete('/:id', remove) 