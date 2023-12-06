import { Request, Response, NextFunction, Express } from "express";
import { orm } from "../shared/db/orm.js";
import { Vehiculo } from "./vehiculo.entity.js";
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js"; //Para el filter desactivado

import cloudinary from "../shared/cloudinaryConfig.js";

const em = orm.em.fork(); //Es fork porque sino tira error

function sanitizeVehiculoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    marca: req.body.marca,
    modelo: req.body.modelo,
    patente: req.body.patente,
    year: req.body.year,
    km: req.body.km,
    transmision: req.body.transmision,
    capacidad: req.body.capacidad,
    image: req.body.image,
    tipoVehiculo: req.body.tipoVehiculo,
    sucursal: req.body.sucursal,
  };
  //MAS VALIDACIONES ACA
  //Sepuede detectar errores e informar desde aca
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const vehiculos = await em.find(
      Vehiculo,
      {},
      { populate: ["tipoVehiculo", /*'seguro',*/ "sucursal"] }
    );
    res
      .status(200)
      .json({ message: "Vehiculos encontrados", vehicles: vehiculos });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se encontraron vehiculos", data: error });
  }
}

async function availables(req: Request, res: Response) {
  try {
    const { fecha_desde, fecha_hasta, transmision, tipo_vehiculo, sucursal } =
      req.query;
    const availableVehicles = await em.getConnection().execute(`select v.*
      from vehiculo v inner join tipo_vehiculo tv
      on v.tipo_vehiculo_id = tv.id
      where tv.id = ${tipo_vehiculo} and v.transmision = ${transmision}
      and v.sucursal_id = ${sucursal}
      and v.id not in (select vehiculo_id from alquiler a
      where a.fecha_hasta > ${fecha_desde} and a.fecha_desde < ${fecha_hasta} and a.estado != 'Cancelada')`);
    res.status(200).json({ vehicles: availableVehicles });
  } catch (error: any) {
    res.status(500).json({ message: "Ocurrió un error", data: error });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const vehiculo = await em.findOneOrFail(
      Vehiculo,
      { id },
      {
        populate: [
          "tipoVehiculo",
          "sucursal",
          "sucursal.localidad",
          "sucursal.localidad.provincia",
        ],
      }
    );
    res.status(200).json({ message: "Vehiculo encontrado", vehicle: vehiculo });
  } catch (error: any) {
    res.status(500).json({ message: "No se encontro vehiculo", data: error });
  }
}

async function add(req: Request, res: Response) {
  try {
    const image = req.file;
    if (image) {
      // Para subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        public_id: `${Date.now()}`,
        resource_type: "auto",
        folder: "images",
      });

      // Crear objeto para almacenar en bd
      req.body.sanitizedInput = {
        //id: parseInt(req.body.id), NO SE ENVIA EL ID CUANDO SE CREA, ES AUTOINCREMENTAL EN LA BASE DE DATOS
        marca: req.body.marca,
        modelo: req.body.modelo,
        patente: req.body.patente,
        km: req.body.km,
        year: parseInt(req.body.year),
        transmision: req.body.transmision,
        capacidad: parseInt(req.body.capacidad),
        image: result.secure_url,
        tipoVehiculo: parseInt(req.body.tipoVehiculo),
        sucursal: parseInt(req.body.sucursal),
      };

      // forma original de hacer el flush
      const input = req.body.sanitizedInput;
      console.log(input);
      const vehiculoNuevo = em.create(Vehiculo, input);
      await em.flush();

      // Devolver res
      res
        .status(201)
        .json({ message: "Se cargó un nuevo vehículo", data: vehiculoNuevo });
    } else {
      // Caso en el que no se proporciona una imagen, es obligatoria
      res
        .status(400)
        .json({ message: "No se proporcionó una imagen en la solicitud" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar el formulario", data: error });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const vehiculoExistente = await em.findOne(Vehiculo, { id });
    if (!vehiculoExistente) {
      return res.status(404).json({ message: "El vehiculo no existe" });
    }
    req.body.sanitizedInput.id = req.params.id;
    const vehiculoModificado = em.getReference(Vehiculo, id);
    em.assign(vehiculoModificado, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: "Vehiculo actualizado correctamente" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo actualizar el vehiculo", dato: error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const vehiculoExistente = await em.findOne(Vehiculo, { id });
    if (!vehiculoExistente) {
      return res.status(404).json({ message: "El vehiculo no existe" });
    }
    const vehiculoBorrar = em.getReference(Vehiculo, id);
    await em.removeAndFlush(vehiculoBorrar);
    res.status(200).send({ message: "Vehiculo eliminado correctamente" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo eliminar el vehiculo", dato: error });
  }
}

export {
  sanitizeVehiculoInput,
  findAll,
  findOne,
  add,
  update,
  remove,
  availables,
};
