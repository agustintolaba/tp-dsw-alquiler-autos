import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Sucursal } from "./sucursal.entity.js"

const em= orm.em

function sanitizeSucursalInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    calle: req.body.calle,
    numeroCalle: req.body.numeroCalle,
    localidad: req.body.localidad
  }
  //MAS VALIDACIONES ACA
  //Sepuede detectar errores e informar desde aca
  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if(req.body.sanitizedInput[key]===undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const sucursales = await em.find(Sucursal, {}, { populate: ['localidad', 'localidad.provincia'] })
    res.status(200).json({ message: 'Sucursales encontradas', branches: sucursales })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontraron sucursales', data: error })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const sucursal = await em.findOneOrFail(Sucursal, { id }, { populate: ['localidad', 'localidad.provincia'] })
    res.status(200).json({ message: 'Sucursal encontrada', sucursal: sucursal })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontro sucursal', data: error })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const sucursalNueva = em.create(Sucursal, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nueva sucursal', data: sucursalNueva })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo cargar la nueva sucursal', data: error })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const sucursalExistente = await em.findOne(Sucursal, { id })
    if (!sucursalExistente) {
      return res.status(404).json({ message: 'La sucursal no existe' })
    }
    req.body.sanitizedInput.id=req.params.id
    const sucursalModificada = em.getReference(Sucursal, id)
    em.assign(sucursalModificada, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Sucursal actualizada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo actualizar la sucursal', data: error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const sucursalExistente = await em.findOne(Sucursal, { id })
    if (!sucursalExistente) {
      return res.status(404).json({ message: 'La sucursal no existe' })
    }
    const sucursalBorrar = em.getReference(Sucursal, id)
    await em.removeAndFlush(sucursalBorrar)
    res.status(200).send({ message: 'Sucursal eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo eliminar la sucursal', data:error })
  }
}

export{sanitizeSucursalInput, findAll, findOne, add, update, remove}  