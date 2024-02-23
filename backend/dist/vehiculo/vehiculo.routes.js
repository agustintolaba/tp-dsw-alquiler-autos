import { Router } from "express";
import { sanitizeVehiculoInput, findAll, findOne, add, update, remove, availables, search, } from "./vehiculo.controler.js";
import { upload } from "../shared/multerConfig.js";
import { validateToken } from "../shared/accessToken.js";
export const vehiculoRouter = Router();
vehiculoRouter.get("/find", findAll);
vehiculoRouter.get("/find/:id", findOne);
vehiculoRouter.get("/search/:search", validateToken, search);
vehiculoRouter.get("/getAvailables", availables);
vehiculoRouter.post("/", upload.single("image"), add);
vehiculoRouter.put("/:id", sanitizeVehiculoInput, update);
vehiculoRouter.patch("/:id", sanitizeVehiculoInput, update);
vehiculoRouter.delete("/:id", remove);
//# sourceMappingURL=vehiculo.routes.js.map