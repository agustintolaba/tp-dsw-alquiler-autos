import { Router } from "express";
import { sanitizeProvinciaInput, findAll, findOne, add, update, remove} from "./usuario.controler.js";

export const usuarioRouter= Router()

usuarioRouter.get('/', findAll)
usuarioRouter.get('/:idUsuario', findOne)
usuarioRouter.post('/', sanitizeProvinciaInput, add)
usuarioRouter.put('/:idUsuario', sanitizeProvinciaInput, update)
usuarioRouter.patch('/:idUsuario', sanitizeProvinciaInput, update)
usuarioRouter.delete('/:idUsuario', remove)