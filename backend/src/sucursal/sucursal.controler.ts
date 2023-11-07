import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Sucursal } from "./sucursal.entity.js"

const em= orm.em

function sanitizeSucursalInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    calleSucursal: req.body.calleSucursal,
    numeroCalleSucursal: req.body.numeroCalleSucursal,
    idLocalidad: req.body.idLocalidad
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
    const sucursales = await em.find(Sucursal, {}, { populate: ['idLocalidad'] })
    res.status(200).json({ message: 'Sucursales encontradas', data: sucursales })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const sucursal = await em.findOneOrFail(Sucursal, { id }, { populate: ['idLocalidad'] })
    res.status(200).json({ message: 'Sucursal encontrada', data: sucursal })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const sucursalNueva = em.create(Sucursal, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nueva sucursal', data: sucursalNueva })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    req.body.sanitizedInput.id=req.params.id
    const sucursalModificada = em.getReference(Sucursal, id)
    em.assign(sucursalModificada, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Sucursal actualizada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const sucursalBorrar = em.getReference(Sucursal, id)
    await em.removeAndFlush(sucursalBorrar)
    res.status(200).send({ message: 'Sucursal eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export{sanitizeSucursalInput, findAll, findOne, add, update, remove}  