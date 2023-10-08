import { Request, Response, NextFunction, request, response } from "express"
import { ProvinciaRepository } from "./provincia.repository.js"
import { Provincia } from "./provincias.entity.js"


const repository = new ProvinciaRepository()

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

async function findAll(req: Request,res: Response){
    res.json({data: await repository.findAll()})
}

async function findOne(req: Request,res: Response){
    /*const provincia= prov.find((prov)=> prov.idProvincia=== req.params.idProvincia)*/
    const id=req.params.id
    const provincia= await repository.findOne({id})
    if(!provincia){
    return res.status(404).send({message: 'Provincia no encontrada'})
    }
    res.json(provincia)
}

async function add(req: Request,res: Response){
const input = req.body.sanitizedInput
const provinciaNueva= 
  new Provincia(
    input.id, 
    input.descripcionProvincia
  )
const ProvNueva= await repository.add(provinciaNueva)
return res.status(201).send({message: 'Se cargo nueva provincia', data: ProvNueva})
}

async function update(req: Request,res: Response){
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)*/
    req.body.sanitizedInput.id=req.params.id  /*PARA MODIFICAR TAMBIEN EL ID*/
    const ProvMod= await repository.update(req.body.sanitizedInput)

    if(!ProvMod){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    /*prov[provinciaInx]={...prov[provinciaInx], ...req.body.sanitizedInput}  LO SACO PORQUE LA MODIFICACION SE HIXO EN EL UPDATE*/
    
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: ProvMod})
}
/*TAMBIEN SIRVE PARA EL PATCH */

async function remove(req: Request,res: Response){
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)*/

    const id=req.params.id
    const ProvBorrar= await repository.delete({id})

    if(!ProvBorrar){
      res.status(404).send({message: 'Provincia no encontrada'})
    }else{
    /*prov.splice(provinciaInx,1)  QUEDA BORRADO EN EL DELETE*/ 
    res.status(200).send({message: 'Provincia eliminada correctamente'})
    }
}


export{sanitizeProvinciaInput, findAll, findOne, add, update, remove}  
/*TAMBIEN SE PUEDE HACER EL EXPORT MEDIANTE UN OBJETO, TAMBIEN CON CLASES PERO TENER CUIDADO CON EL THIS Y BINDING, EN ESE CASO LOS METODOS NO SON FLECHAS*/
/*SE USAN FUNCIONES POR EL BINDING, PERO SE PODRIA USAR OBJETOS O CLASES*/
