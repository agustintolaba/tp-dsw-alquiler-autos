import { Router } from "express";
import { sanitizeTipoUsuarioInput, findAll, findOne, add, update, remove } from "./tipousuario.controler.js";

export const tipoUsuarioRouter= Router()

tipoUsuarioRouter.get('/', findAll) 
tipoUsuarioRouter.get('/:id', findOne)
tipoUsuarioRouter.post('/', sanitizeTipoUsuarioInput, add)
tipoUsuarioRouter.put('/:id', sanitizeTipoUsuarioInput, update)
tipoUsuarioRouter.patch('/:id', sanitizeTipoUsuarioInput, update)
tipoUsuarioRouter.delete('/:id', remove)