import { Request, Response, NextFunction } from "express"
import { TipoVehiculoRepository } from "./tipovehiculo.repository.js"
import { Tipo_Vehiculo } from "./tipovehiculo.entity.js"


const repository = new TipoVehiculoRepository()

function sanitizeProvinciaInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id,
    descripcionTipoVehiculo: req.body.descripcionTipoVehiculo
  }
  Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if(req.body.sanitizedInput[key]===undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

function findAll(req: Request,res: Response){
    res.json({data: repository.findAll()})
}

function findOne(req: Request,res: Response){
    const id=req.params.id
    const tipoVehiculo= repository.findOne({id})
    if(!tipoVehiculo){
    return res.status(404).send({message: 'Tipo de vehiculo no encontrado'})
    }
    res.json(tipoVehiculo)
}

function add(req: Request,res: Response){
const input = req.body.sanitizedInput
const tipoVehiculoNuevo= 
  new Tipo_Vehiculo(
    input.id, 
    input.descripcionTipoVehiculo
  )
const tipoNuevo= repository.add(tipoVehiculoNuevo)
return res.status(201).send({message: 'Se cargo un nuevo tipo de vehiculo', data: tipoNuevo})
}

function update(req: Request,res: Response){
    req.body.sanitizedInput.id=req.params.id
    const tipoVehiculoMod= repository.update(req.body.sanitizedInput)
    if(!tipoVehiculoMod){
     return res.status(404).send({message: 'Tipo de vehiculo no encontrado'})
    }
    return res.status(200).send({message: 'Tipo de vehiculo actualizado correctamente', data: tipoVehiculoMod})
}


function remove(req: Request,res: Response){
    const id=req.params.id
    const tipoVehiculoBorrar= repository.delete({id})
    if(!tipoVehiculoBorrar){
      res.status(404).send({message: 'Tipo de vehiculo no encontrado'})
    }else{
      res.status(200).send({message: 'Tipo de vehiculo eliminado correctamente'})
    }
}


export{sanitizeProvinciaInput, findAll, findOne, add, update, remove} 