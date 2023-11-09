import 'reflect-metadata'
import express from 'express'
import { RequestContext } from '@mikro-orm/core'
import { orm, syncSchema } from './shared/db/orm.js'
import { provinciaRouter } from './provincia/provincia.routes.js'
import { tipoVehiculoRouter } from './tipovehiculo/tipovehiculo.routes.js'
import { usuarioRouter } from './usuario/usuario.routes.js'
import { seguroRouter } from './seguro/seguro.routes.js'
import { localidadRouter } from './localidad/localidad.routes.js'
import { sucursalRouter } from './sucursal/sucursal.routes.js'
import { vehiculoRouter } from './vehiculo/vehiculo.routes.js'
import { tipoUsuarioRouter } from './tipousuario/tipousuario.routes.js'
import { alquilerRouter } from './alquiler/alquiler.routes.js'

const app= express()
app.use(express.json())

//luego de los middleware base de expres
app.use((req,res, next)=>{
  RequestContext.create(orm.em, next)  
  /*Es una abstraccion que permite manejar las entidades
   de forma uniforme desde un unico punto. 
   No usamos los repositories. Usamos UNIT WORK*/
})
//antes de las rutas y  diddleware del negocio

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  next()
})

app.use('/api/provincia', provinciaRouter ) 
app.use('/api/usuario', usuarioRouter)
app.use('/api/tipovehiculo', tipoVehiculoRouter)
app.use('/api/seguro', seguroRouter)
app.use('/api/localidad',localidadRouter)
app.use('/api/sucursal',sucursalRouter)
app.use('/api/vehiculo', vehiculoRouter)
app.use('/api/tipousuario', tipoUsuarioRouter)
app.use('/api/alquiler', alquilerRouter)

app.use((_req, res)=>{
  return res.status(404).send({message:'Recurso no encontrado'})
})

await syncSchema()  /*VA A GENERAR LA BASE DE DATOS CON LA EXTRUCTURA INDICADA, en desarrollo */

app.listen(3000, ()=> {
  console.log('Server running...')
})
 
