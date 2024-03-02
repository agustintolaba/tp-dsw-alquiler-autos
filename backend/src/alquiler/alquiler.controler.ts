import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Alquiler } from "./alquiler.entity.js";
import { Usuario } from "../usuario/usuario.entity.js";
import { ADMIN_DESCRIPTION } from "../shared/constants.js";
import { BookingState } from "../shared/bookingState.js";
import { addDays } from "../shared/dateUtils.js";

const em = orm.em;

function sanitizeAlquilerInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    id: req.body.id,
    fechaRealizacion: req.body.fechaRealizacion,
    fechaDesde: req.body.fechaDesde,
    fechaHasta: req.body.fechaHasta,
    fechaCancelacion: req.body.fechaCancelacion,
    precioTotal: req.body.precioTotal,
    fechaRealEntrega: req.body.fechaRealEntrega,
    fechaRealDevolucion: req.body.fechaRealEntrega,
    estado: req.body.estado,
    usuario: req.body.usuario,
    vehiculo: req.body.vehiculo,
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

async function getAll(req: Request, res: Response) {
  try {
    const usuario = await em.findOne(Usuario, { id: req.userId });
    let alquileres;
    if (req.isAdmin) {
      alquileres = await em.find(
        Alquiler,
        {
          $and: [
            { fechaDesde: { $lte: addDays(new Date(), 30) } },
            { estado: { $ne: BookingState.Cancelada } },
          ],
        },
        {
          populate: [
            "usuario",
            "vehiculo",
            "vehiculo.sucursal",
            "vehiculo.sucursal.localidad",
            "vehiculo.sucursal.localidad.provincia",
          ],
        }
      );
    } else {
      alquileres = await em.find(
        Alquiler,
        { usuario },
        {
          populate: [
            "usuario",
            "vehiculo",
            "vehiculo.sucursal",
            "vehiculo.sucursal.localidad",
            "vehiculo.sucursal.localidad.provincia",
          ],
        }
      );
    }
    res
      .status(200)
      .json({ message: "Alquileres encontrados", bookings: alquileres });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se encontraron alquileres", data: error });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const alquilerBuscado = await em.findOneOrFail(
      Alquiler,
      { id },
      {
        populate: [
          "usuario",
          "vehiculo",
          "vehiculo.sucursal",
          "vehiculo.sucursal.localidad",
          "vehiculo.sucursal.localidad.provincia",
        ],
      }
    );
    res
      .status(200)
      .json({ message: "Alquiler encontrado", bookings: [alquilerBuscado] });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se encontro el alquiler", data: error });
  }
}

async function add(req: Request, res: Response) {
  try {
    const isAdmin = req.isAdmin;
    if (isAdmin) {
      res.status(401).json({ message: "No tiene acceso a este recurso" });
    }
    const userId = req.userId;
    const input = req.body.sanitizedInput;

    const samePreferencesBookings = await em.find(
      Alquiler,
      {
        $and: [
          { fechaHasta: { $gt: input.fechaDesde } },
          { fechaDesde: { $lt: input.fechaHasta } },
          { estado: { $ne: BookingState.Cancelada } },
          { estado: { $ne: BookingState.Finalizada } },
        ],
      },
      {
        populate: ["vehiculo"],
      }
    );

    if (
      samePreferencesBookings.find((el) => el.vehiculo.id == input.vehiculo)
    ) {
      return res
        .status(500)
        .json({ message: "El vehículo no se encuentra disponible" });
    }

    const alquilerNuevo = em.create(Alquiler, {
      ...input,
      estado: "Realizada",
      fechaRealizacion: new Date().toISOString(),
      usuario: userId,
    });
    await em.flush();
    res
      .status(201)
      .json({ message: "Se cargo nuevo alquiler", data: alquilerNuevo });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo cargar el nuevo alquiler", data: error });
  }
}

async function updateStatus(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const alquiler = await em.findOne(
      Alquiler,
      { id },
      { populate: ["usuario"] }
    );
    if (!alquiler) {
      return res.status(404).json({ message: "El alquiler no existe" });
    }

    if (!req.isAdmin && alquiler.usuario.id !== req.userId) {
      return res
        .status(401)
        .json({ message: "No tiene acceso a esta reserva" });
    }

    let newState = req.body.newState;

    if (!newState || !Object.values(BookingState).includes(req.body.newState)) {
      return res.status(400).json({ message: "Nuevo estado inválido" });
    }

    if (newState == BookingState.Iniciada && alquiler.fechaDesde > new Date()) {
      return res.status(400).json({
        message: `No se puede retirar el vehículo antes de la fecha prevista (${
          alquiler.fechaDesde.toISOString().split("T")[0]
        })`,
      });
    }

    alquiler.estado = newState;
    const referenciaAlquiler = em.getReference(Alquiler, id);
    em.assign(referenciaAlquiler, alquiler);
    await em.flush();
    res.status(200).json({
      message: `Nuevo estado de alquiler: ${alquiler.estado}`,
      updatedBooking: alquiler,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "No se pudo actualizar el alquiler", data: error });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const alquilerExistente = await em.findOne(Alquiler, { id });
    if (!alquilerExistente) {
      return res.status(404).json({ message: "El alquiler no existe" });
    }
    const alquilerBorrar = em.getReference(Alquiler, id);
    await em.removeAndFlush(alquilerBorrar);
    res.status(200).send({ message: "Alquiler eliminado correctamente" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Nose pudo eliminar el alquiler", data: error });
  }
}

export { sanitizeAlquilerInput, getAll, findOne, add, updateStatus, remove };
