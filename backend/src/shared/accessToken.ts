import { Usuario } from "../usuario/usuario.entity";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config();

export const generateAccessToken = (user: Usuario): string => {
  console.log("GENERATE TOKEN");
  return jwt.sign({ user: user }, process.env.SECRET || "acstkn");
};

interface IPayload {
  user: Usuario;
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "La sesión ha expirado" });

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET || "acstkn"
    ) as IPayload;

    req.userId = payload.user.id;
    req.isAdmin = payload.user.tipoUsuario.descripcion == "Empleado";

    next();
  } catch (error: any) {
    console.log("ERROR VERIFYING TOKEN!!");
    return res.status(500).json({ message: "Error al validar sesión" });
  }
};
