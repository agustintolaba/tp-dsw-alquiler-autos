import { Request, Response, NextFunction, Express} from "express"
import { orm } from "../shared/db/orm.js"
import { Vehiculo } from "./vehiculo.entity.js"
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js" //Para el filter desactivado

import cloudinary from "../shared/cloudinaryConfig.js"


const em = orm.em.fork() //Es fork porque sino tira error

function sanitizeVehiculoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    nombre: req.body.nombre,
    marca: req.body.marca,
    modelo: req.body.modelo,
    año: req.body.año,
    transmision: req.body.transmision,
    capacidad: req.body.capacidad,
    image: req.body.image,
    tipoVehiculo: req.body.tipoVehiculo,
    seguro: req.body.seguro,
    sucursal: req.body.sucursal
  }
  //MAS VALIDACIONES ACA
  //Sepuede detectar errores e informar desde aca
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const vehiculos = await em.find(Vehiculo, {}, { populate: ['tipoVehiculo', 'seguro', 'sucursal'] })
    res.status(200).json({ message: 'Vehiculos encontrados', vehicles: vehiculos })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontraron vehiculos', data: error })
  }
}

async function availables(req: Request, res: Response) {
  try {
    const { fecha_desde, fecha_hasta, transmision, tipo_vehiculo } = req.query
    const availableVehicules = await em
      .getConnection()
      .execute(`select v.*
      from vehiculo v inner join tipo_vehiculo tv
      on v.tipo_vehiculo_id = tv.id
      where tv.id = ${tipo_vehiculo} and v.transmision = ${transmision}
      and v.id not in (select vehiculo_id from alquiler a
      where a.fecha_hasta > ${fecha_desde} and a.fecha_desde < ${fecha_hasta} and a.estado != 'Cancelada')`)
    res.status(200).json({ vehicles: availableVehicules })
  } catch (error: any) {
    res.status(500).json({ message: 'Ocurrió un error', data: error })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculo = await em.findOneOrFail(Vehiculo, { id }, { populate: ['tipoVehiculo', 'seguro', 'sucursal'] })
    res.status(200).json({ message: 'Vehiculo encontrado', data: vehiculo })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontro vehiculo', data: error })
  }
}

//FUNCION FIND CON FILTER, PARA BUSCAR VEHICULOS SEGUN EL TIPO DE VEHICULO. ESTA INPLEMENTADA LA OTRA FORMA. 
/*async function find(req: Request, res: Response) {
try {
  const filterParam = req.query.filter

  if (filterParam === undefined || filterParam === null)  {
    try {
        const vehiculos = await em.find(Vehiculo, {}, { populate: ['tipoVehiculo', 'seguro', 'sucursal'] })
        res.status(200).json({ message: 'Vehiculos encontrados', data: vehiculos })
      } catch (error: any) {
        res.status(500).json({ message: 'No se encontraron vehiculos', data: error })
      }}
  else{
    const id = Number.parseInt(filterParam as string)
    
    const tipoVehiculo = await em.findOneOrFail(TipoVehiculo, { id })
    if (tipoVehiculo) {
      const vehiculos = await em.find(Vehiculo, { tipoVehiculo }, { populate: ['tipoVehiculo', 'seguro', 'sucursal'] })
      if (vehiculos.length > 0) {
        res.status(200).json({ message: 'Vehiculos encontrados', data: vehiculos })
      } else {
        res.status(200).json({ message: 'No se encontraron vehiculos de tipo de vehiculo especifico', data: vehiculos })
      }
    } else {
      res.status(404).json({ message: 'Tipo de vehículo no encontrado' })
    }
  }} catch (error: any) {
    res.status(500).json({ message: 'Error al buscar vehículos', data: error })
  }
}*/


//FUNCION ADD ORIGINAL, SIN LA IMAGEN
/*async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const vehiculoNuevo = em.create(Vehiculo, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo vehiculo', data: vehiculoNuevo })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo cargar el nuevo vehiculo', data: error })
  }
}*/


async function add(req: Request, res: Response) {
  try {
    const image = req.file
    if (image) {
      // Para subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        public_id: `${Date.now()}`,
        resource_type: 'auto',
        folder: 'images',
      });

      // Crear objeto para almacenar en bd
      req.body.sanitizedInput = {
        id: req.body.id,
        nombre: req.body.nombre,
        trasmision: req.body.trasmision,
        capacidad: parseInt(req.body.capacidad),
        disponible: parseInt(req.body.disponible),
        image: result.secure_url,
        tipoVehiculo: parseInt(req.body.tipoVehiculo),
        seguro: parseInt(req.body.seguro),
        sucursal: parseInt(req.body.sucursal),
      };

      // forma original de hacer el flush
      const input = req.body.sanitizedInput
      const vehiculoNuevo = em.create(Vehiculo, input)
      await em.flush()

      // Devolver res
      res.status(201).json({ message: 'Se cargó un nuevo vehículo', data: vehiculoNuevo })
    } else {
      // Caso en el que no se proporciona una imagen, es obligatoria
      res.status(400).json({ message: 'No se proporcionó una imagen en la solicitud' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el formulario del nuevo vehiculo:', data: error })
  }
}


async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculoExistente = await em.findOne(Vehiculo, { id })
    if (!vehiculoExistente) {
      return res.status(404).json({ message: 'El vehiculo no existe' })
    }
    req.body.sanitizedInput.id = req.params.id
    const vehiculoModificado = em.getReference(Vehiculo, id)
    em.assign(vehiculoModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Vehiculo actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo actualizar el vehiculo', dato: error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const vehiculoExistente = await em.findOne(Vehiculo, { id })
    if (!vehiculoExistente) {
      return res.status(404).json({ message: 'El vehiculo no existe' })
    }
    const vehiculoBorrar = em.getReference(Vehiculo, id)
    await em.removeAndFlush(vehiculoBorrar)
    res.status(200).send({ message: 'Vehiculo eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo eliminar el vehiculo', dato: error })
  }
}

export { sanitizeVehiculoInput, findAll, findOne, add, update, remove, availables }  