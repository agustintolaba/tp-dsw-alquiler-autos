import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Seguro } from "./seguro.entity.js"

const em= orm.em

function sanitizeSeguroInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    nombreSeguro: req.body.nombreSeguro,
    companiaSeguro: req.body.companiaSeguro
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
    const seguros = await em.find(Seguro, {})
    res.status(200).json({ message: 'Seguros encontradas', data: seguros })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const seguroBuscado = await em.findOneOrFail(Seguro, { id })
    res.status(200).json({ message: 'Seguro encontrado', data: seguroBuscado })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const seguroNuevo = em.create(Seguro, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo seguro', data: seguroNuevo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    req.body.sanitizedInput.id=req.params.id
    const seguroModificado = em.getReference(Seguro, id)
    em.assign(seguroModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Seguro actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const seguroBorrar = em.getReference(Seguro, id)
    await em.removeAndFlush(seguroBorrar)
    res.status(200).send({ message: 'Seguro eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export{sanitizeSeguroInput, findAll, findOne, add, update, remove}  

