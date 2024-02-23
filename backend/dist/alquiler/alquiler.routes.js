import { Router } from "express";
import { sanitizeAlquilerInput, getAll, findOne, add, updateStatus, remove, } from "./alquiler.controler.js";
import { validateToken } from "../shared/accessToken.js";
export const alquilerRouter = Router();
alquilerRouter.get("/getAll", validateToken, getAll);
alquilerRouter.get("/:id", findOne);
alquilerRouter.post("/", validateToken, sanitizeAlquilerInput, add);
alquilerRouter.patch("/:id", validateToken, sanitizeAlquilerInput, updateStatus);
alquilerRouter.delete("/:id", remove);
//# sourceMappingURL=alquiler.routes.js.map