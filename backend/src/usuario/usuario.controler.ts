import { Request, Response, NextFunction } from "express"
import { orm } from "../shared/db/orm.js"
import { Usuario } from "./usuario.entity.js"

const em= orm.em

function sanitizeUsuarioInput (req: Request, res: Response, next: NextFunction){
  req.body.sanitizedInput={
    id: req.body.id, 
    nombreUsuario: req.body.nombreUsuario,
    apellidoUsuario: req.body.apellidoUsuario,
    fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
    cuitCliente: req.body.cuitCliente,
    razonSocialCliente: req.body.razonSocialCliente,
    telefonoCliente: req.body.telefonoCliente,
    fechaContratacion: req.body.fechaContratacion,
    mailCliente: req.body.mailCliente,
    passwordCliente: req.body.passwordCliente, 
    tipoUsuario: req.body.tipoUsuario
  }
    Object.keys(req.body.sanitizedInput).forEach((key)=>{
    if(req.body.sanitizedInput[key]===undefined){
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}


async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await em.find(Usuario, {},  { populate: ['tipoUsuario'] })
    res.status(200).json({ message: 'Ususarios encontrados', data: usuarios })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontraron ususarios', data: error })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const usuarioBuscado = await em.findOneOrFail(Usuario, { id }, { populate: ['tipoUsuario'] })
    res.status(200).json({ message: 'Usuario encontrado', data: usuarioBuscado })
  } catch (error: any) {
    res.status(500).json({ message: 'No se encontro ususario', data: error })
  }
}

async function add(req: Request, res: Response) {
  try {
    const input = req.body.sanitizedInput
    const usuarioNuevo = em.create(Usuario, input)
    await em.flush()
    res.status(201).json({ message: 'Se cargo nuevo usuario', data: usuarioNuevo })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo cargar el nuevo usuario', data: error })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const usuarioExistente = await em.findOne(Usuario, { id })
    if (!usuarioExistente) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }
    req.body.sanitizedInput.id=req.params.id
    const usuarioModificado = em.getReference(Usuario, id)
    em.assign(usuarioModificado, req.body.sanitizedInput)
    await em.flush()
    res.status(200).json({ message: 'Usuario actualizado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo actualizar el ususario', data: error })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const usuarioExistente = await em.findOne(Usuario, { id })
    if (!usuarioExistente) {
      return res.status(404).json({ message: 'El usuario no existe' })
    }
    const usuarioBorrar = em.getReference(Usuario, id)
    await em.removeAndFlush(usuarioBorrar)
    res.status(200).send({ message: 'Usuario eliminado correctamente' })
  } catch (error: any) {
    res.status(500).json({ message: 'No se pudo eliminar el usuario', data: error.message })
  }
}

export{sanitizeUsuarioInput, findAll, findOne, add, update, remove}
