import { Request, Response, NextFunction } from "express";
import { TipoVehiculo } from "./tipovehiculo.entity.js";
import { orm } from "../shared/db/orm.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";

const em = orm.em;

function sanitizeTipoVehiculoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    image: req.body.image,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const tiposVehiculos = await em.find(
      TipoVehiculo,
      {},
      { orderBy: { nombre: "asc" } }
    );
    console.log(tiposVehiculos);
    res.status(200).json({
      message: "Tipos de Vehiculos encontrados",
      types: tiposVehiculos,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se encontraron tipos de vehiculos", data: error });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoVehiculo = await em.findOneOrFail(TipoVehiculo, { id });
    res
      .status(200)
      .json({ message: "Tipo de vehiculo encontrado", data: tipoVehiculo });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se encontro el tipo de vehiculo", data: error });
  }
}

async function findFilter(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoVehiculo = await em.findOneOrFail(TipoVehiculo, { id });
    if (tipoVehiculo) {
      const vehiculos = await em.find(
        Vehiculo,
        { tipoVehiculo },
        {
          populate: [
            "tipoVehiculo",
            "sucursal",
            "sucursal.localidad",
            "sucursal.localidad.provincia",
          ],
        }
      );
      if (vehiculos.length > 0) {
        res
          .status(200)
          .json({ message: "Vehiculos encontrados", vehicles: vehiculos });
      } else {
        res.status(200).json({
          message: "No se encontraron vehiculos de tipo de vehiculo especifico",
          data: vehiculos,
        });
      }
    } else {
      res.status(404).json({ message: "Tipo de vehículo no encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error al buscar vehículos", data: error });
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput;
    const tipoVehiculoNuevo = em.create(TipoVehiculo, input);
    await em.flush();
    res.status(201).json({
      message: "Se cargo nuevo tipo de vehiculo",
      data: tipoVehiculoNuevo,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "No se pudo cargar el nuevo tipo de vehiculo",
      data: error,
    });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoVehiculoExistente = await em.findOne(TipoVehiculo, { id });
    if (!tipoVehiculoExistente) {
      return res.status(404).json({ message: "El tipo de vehiculo no existe" });
    }
    req.body.sanitizedInput.id = req.params.id;
    const tipoVehiculoModificado = em.getReference(TipoVehiculo, id);
    em.assign(tipoVehiculoModificado, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: "Tipo de Vehiculo actualizado correctamente" });
  } catch (error: any) {
    res.status(500).json({
      message: "No se pudo actualizar el tipo de vehiculo",
      data: error,
    });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoVehiculoExistente = await em.findOne(TipoVehiculo, { id });
    if (!tipoVehiculoExistente) {
      return res.status(404).json({ message: "El tipo de vehiculo no existe" });
    }
    const tipoVehiculoBorrar = em.getReference(TipoVehiculo, id);
    await em.removeAndFlush(tipoVehiculoBorrar);
    res
      .status(200)
      .send({ message: "Tipo de vehiculo eliminado correctamente" });
  } catch (error: any) {
    res.status(500).json({
      message: "No se pudo eliminar el tipo de vehiculo",
      data: error,
    });
  }
}

export {
  sanitizeTipoVehiculoInput,
  findAll,
  findOne,
  findFilter,
  add,
  update,
  remove,
};
