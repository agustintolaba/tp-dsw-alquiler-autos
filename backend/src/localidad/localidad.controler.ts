import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Localidad } from "./localidad.entity.js"

const em= orm.em

function sanitizeLocalidadInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    nombreLocalidad: req.body.nombreLocalidad,
    Provincia: req.body.Provincia
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
    const localidades = await em.find(Localidad, {},  { populate: ['Provincia'] })
    res.status(200).json({ message: 'Localidades encontradas', data: localidades })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const localidadBuscada = await em.findOneOrFail(Localidad, { id }, { populate: ['Provincia'] })
    res.status(200).json({ message: 'Localidad encontrada', data: localidadBuscada })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const localidadNueva = em.create(Localidad, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nueva localidad', data: localidadNueva })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    req.body.sanitizedInput.id=req.params.id
    const localidadModificada = em.getReference(Localidad, id)
    em.assign(localidadModificada, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Localidad actualizada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const localidadBorrar = em.getReference(Localidad, id)
    await em.removeAndFlush(localidadBorrar)
    res.status(200).send({ message: 'Localidad eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export{sanitizeLocalidadInput, findAll, findOne, add, update, remove}  