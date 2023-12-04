import { Router } from "express";
import {
  sanitizeProvinciaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./provincia.controler.js";
import { validateToken } from "../shared/accessToken.js";

export const provinciaRouter = Router();

provinciaRouter.get(
  "/",
  findAll
); /*LA RUTA ES GENERICA, DARLE USOS EN OTRAS PARTES DE LA APP */
provinciaRouter.get("/:id", findOne);
provinciaRouter.post("/", validateToken, sanitizeProvinciaInput, add);
provinciaRouter.put("/:id", validateToken, sanitizeProvinciaInput, update);
provinciaRouter.patch("/:id", validateToken, sanitizeProvinciaInput, update);
provinciaRouter.delete("/:id", validateToken, remove);
