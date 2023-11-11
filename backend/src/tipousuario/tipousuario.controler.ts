import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { TipoUsuario } from "./tipousuario.entity.js"
import { SQLError, getSQLErrorMessage, isSQLError } from "../shared/errorHandling.js"

const em = orm.em

function sanitizeTipoUsuarioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    id: req.body.id,
    descripcion: req.body.descripcion
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
    const tipoUsuarios = await em.find(TipoUsuario, {})
    res.status(200).json({ message: 'Tipos de usuario encontrados', data: tipoUsuarios })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontraron tipos de usuarios', dato: error })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoUsuario = await em.findOneOrFail(TipoUsuario, { id })
    res.status(200).json({ message: 'Tipo de usuario encontrado', data: tipoUsuario })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontro tipo de usuario', data: error })
  }
}

async function add(req: Request, res: Response) {
  try {    
    const input = req.body.sanitizedInput
    const tipoUsuarioNuevo = em.create(TipoUsuario, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo tipo de usuario', data: tipoUsuarioNuevo })
  } catch (error: any) {
    if (isSQLError(error)) {
      res.status(500).json({ message: getSQLErrorMessage(error, "Tipo de usuario")})
    } else {
      res.status(500).json({ message: 'No se pudo cargar el nuevo tipo de usuario', data: error })
    }    
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoUsuarioExistente = await em.findOne(TipoUsuario, { id })
    if (!tipoUsuarioExistente) {
      return res.status(404).json({ message: 'El tipo de usuario no existe' })
    }
    req.body.sanitizedInput.id = req.params.id
    const tipoUsuarioModificado = em.getReference(TipoUsuario, id)
    em.assign(tipoUsuarioModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Tipo de Usuario actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo actualizar el tipo de usuario', data: error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoUsuarioExistente = await em.findOne(TipoUsuario, { id })
    if (!tipoUsuarioExistente) {
      return res.status(404).json({ message: 'El tipo de usuario no existe' })
    }
    const tipoUsuarioBorrar = em.getReference(TipoUsuario, id)
    await em.removeAndFlush(tipoUsuarioBorrar)
    res.status(200).send({ message: 'Tipo de Usuario eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo eliminar el tipo de ususario', data: error })
  }
}

export { sanitizeTipoUsuarioInput, findAll, findOne, add, update, remove }  
