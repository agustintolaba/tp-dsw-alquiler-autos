import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove } from "./seguro.controler.js";

export const seguroRouter= Router()

seguroRouter.get('/', findAll) 
seguroRouter.get('/:idSeguro', findOne)
seguroRouter.post('/', sanitizeProvinciaInput, add)
seguroRouter.put('/:idSeguro', sanitizeProvinciaInput, update)
seguroRouter.patch('/:idSeguro', sanitizeProvinciaInput, update)
seguroRouter.delete('/:idSeguro', remove) 