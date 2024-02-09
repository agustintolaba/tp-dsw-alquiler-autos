import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Provincia } from "./provincias.entity.js";
import { getSQLErrorMessage, isSQLError } from "../shared/errorHandling.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { ADMIN_DESCRIPTION } from "../shared/constants.js";
import { Localidad } from "../localidad/localidad.entity.js";

const em = orm.em;

function sanitizeProvinciaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    descripcion: req.body.descripcion,
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
    const provincias = await em.find(Provincia, {});
    res
      .status(200)
      .json({ message: "Provincias encontradas", data: provincias });
  } catch (error: any) {
    res.status(500).json({ message: "Provincias no encontradas", data: error });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const provincia = await em.findOneOrFail(Provincia, { id });
    res.status(200).json({ message: "Provincia encontrada", data: provincia });
  } catch (error: any) {
    res.status(500).json({ message: "Provincia no encontrada", data: error });
  }
}

async function findFilter(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const provincia = await em.findOneOrFail(Provincia, { id })
    if (provincia) {
      const localidades = await em.find(Localidad, { provincia }, { populate: ['provincia'] })
      if (localidades.length > 0) {
        res.status(200).json({ message: 'Localidades encontradas', data: localidades })
      } else {
        res.status(200).json({ message: 'No se encontraron localidades en la provincia', data: localidades })
      }
    } else {
      res.status(404).json({ message: 'Provincia no encontrada' })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Error al buscar localidades', data: error })
  }
}

async function add(req: Request, res: Response) {
  try {
    const isAdmin = req.isAdmin;
    if (isAdmin) {
      const input = req.body.sanitizedInput;
      const provinciaNueva = em.create(Provincia, input);
      await em.flush();
      res
        .status(201)
        .json({ message: "Se cargo nueva provincia", data: provinciaNueva });
    } else {
      res.status(401).json({ message: "No tiene acceso" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo cargar la nueva provincia", data: error });
  }
}

async function update(req: Request, res: Response) {
  try {
    const isAdmin = req.isAdmin;
    if (isAdmin) {
      const id = Number.parseInt(req.params.id);
      const provinciaExistente = await em.findOne(Provincia, { id });
      if (!provinciaExistente) {
        return res.status(404).json({ message: "La provincia no existe" });
      }
      req.body.sanitizedInput.id = req.params.id;
      const provinciaModificada = em.getReference(Provincia, id);
      em.assign(provinciaModificada, req.body.sanitizedInput);
      await em.flush();
      res.status(200).json({ message: "Provincia actualizada correctamente" });
    } else {
      res.status(401).json({ message: "No tiene acceso" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo actualizar la provincia", data: error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const isAdmin = req.isAdmin;
    if (isAdmin) {
      const id = Number.parseInt(req.params.id);
      const provinciaExistente = await em.findOne(Provincia, { id });
      if (!provinciaExistente) {
        return res.status(404).json({ message: "La provincia no existe" });
      }
      const provinciaBorrar = em.getReference(Provincia, id);
      await em.removeAndFlush(provinciaBorrar);
      res.status(200).send({ message: "Provincia eliminada correctamente" });
    } else {
      res.status(401).json({ message: "No tiene acceso" });
    }
  } catch (error: any) {
    if (isSQLError(error)) {
      res.status(500).json({ message: getSQLErrorMessage(error, "Provincia") });
    } else {
      res
        .status(500)
        .json({ message: "No se pudo eliminar la provincia", data: error });
    }
  }
}

export { sanitizeProvinciaInput, findAll, findOne, findFilter, add, update, remove };
