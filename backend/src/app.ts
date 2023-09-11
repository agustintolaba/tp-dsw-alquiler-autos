import express, { NextFunction, Request, Response } from 'express'
import {Provincia} from './provincia/provincias.entity.js'

const app= express()

app.use(express.json())

const prov= [
  new Provincia(
    '1', 'Santa Fe'
  ),
]

function sanitizeProvinciaInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    idProvincia: req.body.idProvincia,
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

app.get('/api/provincia', (req,res)=>{
    res.json(prov)
})

app.get('/api/provincia/:idProvincia', (req,res)=>{
    const provincia= prov.find((prov)=> prov.idProvincia=== req.params.idProvincia)
    if(!provincia){
    return res.status(404).send({message: 'Provincia no encontrada'})
    }
    res.json(provincia)
})


app.post('/api/provincia', sanitizeProvinciaInput,(req,res)=>{
const input = req.body.sanitizedInput

const provinciaNueva= 
  new Provincia(
    input.idProvincia, 
    input.descripcionProvincia
  )

prov.push(provinciaNueva)
return res.status(201).send({message: 'Se cargo nueva provincia', data: provinciaNueva})
})

app.put('/api/provincia/:idProvincia',sanitizeProvinciaInput, (req,res)=>{
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    if(provinciaInx===-1){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    prov[provinciaInx]={...prov[provinciaInx], ...req.body.sanitizedInput}
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: prov[provinciaInx]})
})


app.patch('/api/provincia/:idProvincia',sanitizeProvinciaInput, (req,res)=>{
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    if(provinciaInx===-1){
     return res.status(404).send({message: 'Provincia no encontrada'})
    }
    Object.assign(prov[provinciaInx], req.body.sanitizedInput)
    return res.status(200).send({message: 'Provincia actualizada correctamente', data: prov[provinciaInx]})
})

app.delete('/api/provincia/:idProvincia',(req,res)=>{
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)
    if(provinciaInx===-1){
      res.status(404).send({message: 'Provincia no encontrada'})
    }else{
    prov.splice(provinciaInx,1)
    res.status(200).send({message: 'Provincia eliminada correctamente'})
    }
})  

app.use((_req, res)=>{
  return res.status(404).send({message:'Recurso no encontrado'})
})

app.listen(3000, ()=> {
  console.log('Server running...')
})

