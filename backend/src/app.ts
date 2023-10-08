import express from 'express'
import { provinciaRouter } from './provincia/provincia.routes.js'
import { tipoVehiculoRouter } from './tipovehiculo/tipovehiculo.routes.js'
import { usuarioRouter } from './usuario/usuario.routes.js'
import { seguroRouter } from './seguro/seguro.routes.js'
import { pooldb } from './shared/db/conn.mysql.js'

const app= express()

app.use(express.json())


app.use('/api/provincia', provinciaRouter ) 
app.use('/api/usuario', usuarioRouter)
app.use('/api/tipovehiculo', tipoVehiculoRouter)
app.use('/api/seguro', seguroRouter)

app.use((_req, res)=>{
  return res.status(404).send({message:'Recurso no encontrado'})
})

try {
    const connection = await pooldb.getConnection()
    // La conexión fue exitosa, puedes realizar operaciones en la base de datos aquí
    console.log('Conexión a la base de datos exitosa');

  } catch (error) {
    // La conexión falló, maneja el error aquí
    console.error('Error al conectar a la base de datos:', error);
  }


app.listen(3000, ()=> {
  console.log('Server running...')
})
 
