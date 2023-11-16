import { Router } from "express";
import { sanitizeUsuarioInput, findAll, findOne, login, signup, update, remove } from "./usuario.controler.js";
import { validateToken } from "../shared/accessToken.js";

export const usuarioRouter = Router()

usuarioRouter.get('/', validateToken, findAll)
usuarioRouter.get('/:id', validateToken, findOne)
usuarioRouter.post('/login', sanitizeUsuarioInput, login)
usuarioRouter.post('/signup', sanitizeUsuarioInput, signup)
usuarioRouter.put('/:id', validateToken, sanitizeUsuarioInput, update)
usuarioRouter.patch('/:id', validateToken, sanitizeUsuarioInput, update)
usuarioRouter.delete('/:id', validateToken, remove)