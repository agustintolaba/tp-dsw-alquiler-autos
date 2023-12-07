import { Router } from "express";
import {
  sanitizeProvinciaInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  findFilter,
} from "./provincia.controler.js";
import { validateToken } from "../shared/accessToken.js";

export const provinciaRouter = Router();

provinciaRouter.get(
  "/",
  findAll
); /*LA RUTA ES GENERICA, DARLE USOS EN OTRAS PARTES DE LA APP */
provinciaRouter.get("/:id", findOne);
provinciaRouter.get("/:id/localidad", findFilter);
provinciaRouter.post("/", validateToken, sanitizeProvinciaInput, add);
provinciaRouter.put("/:id", validateToken, sanitizeProvinciaInput, update);
provinciaRouter.patch("/:id", validateToken, sanitizeProvinciaInput, update);
provinciaRouter.delete("/:id", validateToken, remove);
