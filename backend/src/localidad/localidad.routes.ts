import { Router } from "express";
import { sanitizeLocalidadInput, findAll, findOne, add, update, remove } from "./localidad.controler.js";

export const localidadRouter= Router()

localidadRouter.get('/', findAll) 
localidadRouter.get('/:id', findOne)
localidadRouter.post('/', sanitizeLocalidadInput, add)
localidadRouter.put('/:id', sanitizeLocalidadInput, update)
localidadRouter.patch('/:id', sanitizeLocalidadInput, update)
localidadRouter.delete('/:id', remove)