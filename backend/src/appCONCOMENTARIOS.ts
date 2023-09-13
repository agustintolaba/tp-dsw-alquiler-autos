import express, { NextFunction, Request, Response } from 'express'
import {Provincia} from './provincia/provincias.entity.js'
import { ProvinciaRepository } from './provincia/provincia.repository.js'
import { provinciaRouter } from './provincia/provincia.routes.js'

const app= express()

app.use(express.json())

/*const repository = new ProvinciaRepository() PASO A CONTROLER*/

/*const prov= [
  new Provincia(
    '1', 'Santa Fe'
  ),
] CREO QUE TAMPOCO SE USA ACA, ESTA EN REPOSITORY



/*app.get('/api/provincia', (req,res)=>{
    res.json({data: repository.findAll()})
}) PASO A CONTROLER*/

app.use('/api/provincia', provinciaRouter ) /*REEMPLAZA AL GET, CUANDO SE RECIBE ESA RUTA ES MANEJADA POR PROVINICArOUTER */


/*app.get('/api/provincia/:idProvincia', (req,res)=>{
    /*const provincia= prov.find((prov)=> prov.idProvincia=== req.params.idProvincia)
    const idProvincia=req.params.idProvincia
    const provincia= repository.findOne({idProvincia})
    if(!provincia){
    return res.status(404).send({message: 'Provincia no encontrada'})
    }
    res.json(provincia)
}) 
LO PASO AL CONTROLER*/


/*app.post('/api/provincia', sanitizeProvinciaInput,(req,res)=>{
const input = req.body.sanitizedInput

const provinciaNueva= 
  new Provincia(
    input.idProvincia, 
    input.descripcionProvincia
  )

const ProvNueva= repository.add(provinciaNueva)

return res.status(201).send({message: 'Se cargo nueva provincia', data: ProvNueva})
})
LO PASO AL CONTROLEER*/

/*app.put('/api/provincia/:idProvincia',sanitizeProvinciaInput, (req,res)=>{
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    req.body.sanitizedInput.idProvincia=req.params.idProvincia  /*PARA MODIFICAR TAMBIEN EL ID
    const ProvMod= repository.update(req.body.sanitizedInput)

    if(!ProvMod){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    /*prov[provinciaInx]={...prov[provinciaInx], ...req.body.sanitizedInput}  LO SACO PORQUE LA MODIFICACION SE HIXO EN EL UPDATE
    
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: ProvMod})
})
LO PASO AL CONTROLLER
*/


/*app.patch('/api/provincia/:idProvincia',sanitizeProvinciaInput, (req,res)=>{
    /* DEJA EL MISMO CODIGO QUE PARA EL PUT, DESPUES SE MODIFICA PARA DIFERENCIARLO
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    if(provinciaInx===-1){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    Object.assign(prov[provinciaInx], req.body.sanitizedInput)
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: prov[provinciaInx]})*/ 

    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    req.body.sanitizedInput.idProvincia=req.params.idProvincia  /*PARA MODIFICAR TAMBIEN EL ID
    const ProvMod= repository.update(req.body.sanitizedInput)

    if(!ProvMod){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    /*prov[provinciaInx]={...prov[provinciaInx], ...req.body.sanitizedInput}  LO SACO PORQUE LA MODIFICACION SE HIXO EN EL UPDATE
    
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: ProvMod})
})
ESTE NO LO PASE AL CONTROLLER, CON EL PUT ARMO EL UPDATE PARA LOS DOS*/

/*app.delete('/api/provincia/:idProvincia',(req,res)=>{
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)

    const idProvincia=req.params.idProvincia
    const ProvBorrar= repository.delete({idProvincia})

    if(!ProvBorrar){
      res.status(404).send({message: 'Provincia no encontrada'})
    }else{
    /*prov.splice(provinciaInx,1)  QUEDA BORRADO EN EL DELETE
    res.status(200).send({message: 'Provincia eliminada correctamente'})
    }
}) 
LO PASO AL CONTROLLER*/ 


app.use((_req, res)=>{
  return res.status(404).send({message:'Recurso no encontrado'})
})

app.listen(3000, ()=> {
  console.log('Server running...')
})
 
