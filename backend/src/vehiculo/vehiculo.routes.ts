import { Router } from "express";
import { sanitizeVehiculoInput, findAll, findOne, add, update, remove } from "./vehiculo.controler.js";
import { upload } from "../shared/multerConfig.js";

export const vehiculoRouter= Router()

vehiculoRouter.get('/', findAll)
vehiculoRouter.get('/:id', findOne)
//vehiculoRouter.post('/', sanitizeVehiculoInput, upload.single('image'), add)
vehiculoRouter.post('/',upload.single('image'), add)
vehiculoRouter.put('/:id', sanitizeVehiculoInput, update)
vehiculoRouter.patch('/:id', sanitizeVehiculoInput, update)
vehiculoRouter.delete('/:id', remove)

/*vehiculoRouter.get('/', find)*/