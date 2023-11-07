import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Vehiculo } from "./vehiculo.entity.js"

const em= orm.em

function sanitizeVehiculoInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    trasmision: req.body.trasmision,
    capacidad: req.body.capacidad,
    disponible: req.body.disponible,
    idTipoVehiculo: req.body.idTipoVehiculo,
    idSeguro: req.body.idSeguro,
    idSucursal: req.body.idSucursal
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
    const vehiculos = await em.find(Vehiculo, {}, { populate: ['idTipoVehiculo', 'idSeguro', 'idSucursal'] })
    res.status(200).json({ message: 'Vehiculos encontrados', data: vehiculos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculo = await em.findOneOrFail(Vehiculo, {}, { populate: ['idTipoVehiculo', 'idSeguro', 'idSucursal'] })
    res.status(200).json({ message: 'Vehiculo encontrado', data: vehiculo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const vehiculoNuevo = em.create(Vehiculo, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo vehiculo', data: vehiculoNuevo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    req.body.sanitizedInput.id=req.params.id
    const vehiculoModificado= em.getReference(Vehiculo, id)
    em.assign(vehiculoModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Vehiculo actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculoBorrar = em.getReference(Vehiculo, id)
    await em.removeAndFlush(vehiculoBorrar)
    res.status(200).send({ message: 'Vehiculo eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export{sanitizeVehiculoInput, findAll, findOne, add, update, remove}  