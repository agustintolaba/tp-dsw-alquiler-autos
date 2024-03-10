import { Router } from "express";
import {
  sanitizeSucursalInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from "./sucursal.controler.js";
import { validateToken } from "../shared/accessToken.js";

export const sucursalRouter = Router();

sucursalRouter.get("/", findAll);
sucursalRouter.get("/:id", findOne);
sucursalRouter.post("/", validateToken, sanitizeSucursalInput, add);
sucursalRouter.put("/:id", validateToken, sanitizeSucursalInput, update);
sucursalRouter.patch("/:id", validateToken, sanitizeSucursalInput, update);
sucursalRouter.delete("/:id", validateToken, remove);
