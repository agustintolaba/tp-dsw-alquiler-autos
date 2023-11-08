import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Alquiler } from "./alquiler.entity.js"

const em= orm.em

function sanitizeAlquilerInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    fechaRealizacionReserva: req.body.fechaRealizacionReserva,
    fechaHoraPactadaEntrega: req.body.fechaHoraPactadaEntrega,
    fechaHoraPactadaDevolucion: req.body.fechaHoraPactadaDevolucion,
    fechaCancelacion: req.body.fechaCancelacion,
    precioTotal: req.body.precioTotal,
    fechaHoraRealEntrega: req.body.fechaHoraRealEntrega,
    fechaHoraRealDevolucion: req.body.fechaHoraRealEntrega,
    estadoAlquiler: req.body.estadoAlquiler,
    usuario: req.body.usuario,
    vehiculo: req.body.vehiculo
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
    const alquileres = await em.find(Alquiler, {},  { populate: ['usuario', 'vehiculo'] })
    res.status(200).json({ message: 'Alquileres encontrados', data: alquileres })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontraron alquileres', data: error })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquilerBuscado = await em.findOneOrFail(Alquiler, { id }, { populate: ['usuario', 'vehiculo'] })
    res.status(200).json({ message: 'Alquiler encontrado', data: alquilerBuscado })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontro el alquiler', data: error })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const alquilerNuevo = em.create(Alquiler, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo alquiler', data: alquilerNuevo})
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo cargar el nuevo alquiler', data: error })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquilerExistente = await em.findOne(Alquiler, { id })
    if (!alquilerExistente) {
      return res.status(404).json({ message: 'El alquiler no existe' })
    }
    req.body.sanitizedInput.id=req.params.id
    const alquilerModificado = em.getReference(Alquiler, id)
    em.assign(alquilerModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Alquiler actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo actualizar el alquiler', data: error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const alquilerExistente = await em.findOne(Alquiler, { id })
    if (!alquilerExistente) {
      return res.status(404).json({ message: 'El alquiler no existe' })
    }
    const alquilerBorrar = em.getReference(Alquiler, id)
    await em.removeAndFlush(alquilerBorrar)
    res.status(200).send({ message: 'Alquiler eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'Nose pudo eliminar el alquiler', data: error })
  }
}

export{sanitizeAlquilerInput, findAll, findOne, add, update, remove}  