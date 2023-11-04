import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Provincia } from "./provincias.entity.js"

const em= orm.em

function sanitizeProvinciaInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    descripcionProvincia: req.body.descripcionProvincia
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
    const provincias = await em.find(Provincia, {})
    res.status(200).json({ message: 'Provincias encontradas', data: provincias })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const provincia = await em.findOneOrFail(Provincia, { id })
    res.status(200).json({ message: 'Provincia encontrada', data: provincia })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const provinciaNueva = em.create(Provincia, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nueva provincia', data: provinciaNueva })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    req.body.sanitizedInput.id=req.params.id
    const provinciaModificada = em.getReference(Provincia, id)
    em.assign(provinciaModificada, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Provincia actualizada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const provinciaBorrar = em.getReference(Provincia, id)
    await em.removeAndFlush(provinciaBorrar)
    res.status(200).send({ message: 'Provincia eliminada correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export{sanitizeProvinciaInput, findAll, findOne, add, update, remove}  

