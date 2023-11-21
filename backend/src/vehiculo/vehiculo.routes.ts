import { Router } from "express";
import { sanitizeVehiculoInput, findAll, findOne, add, update, remove, availables } from "./vehiculo.controler.js";
import { upload } from "../shared/multerConfig.js";

export const vehiculoRouter = Router()

vehiculoRouter.get('/find', findAll)
vehiculoRouter.get('/find/:id', findOne)
vehiculoRouter.get('/getAvailables', availables)
//vehiculoRouter.post('/', sanitizeVehiculoInput, upload.single('image'), add)
vehiculoRouter.post('/', upload.single('image'), add)
vehiculoRouter.put('/:id', sanitizeVehiculoInput, update)
vehiculoRouter.patch('/:id', sanitizeVehiculoInput, update)
vehiculoRouter.delete('/:id', remove)