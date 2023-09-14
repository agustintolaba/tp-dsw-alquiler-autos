import { UsuarioRepository } from "./usuario.repository.js";
import { Usuario } from "./usuario.entity.js";
const repository = new UsuarioRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        idUsuario: req.body.idUsuario,
        nombreUsuario: req.body.nombreUsuario,
        apellidoUsuario: req.body.apellidoUsuario,
        fechaNacimientoUsuario: req.body.fechaNacimientoUsuario,
        cuitCliente: req.body.cuitCliente,
        razonSocialCliente: req.body.razonSocialCliente,
        telefonoCliente: req.body.telefonoCliente,
        idEmpleado: req.body.idEmpleado,
        fechaContratacion: req.body.fechaContratacion,
        idTipoUsuario: req.body.idTipoUsuario
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const idUsuario = req.params.idUsuario;
    const usuarioBuscado = repository.findOne({ idUsuario });
    if (!usuarioBuscado) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.json(usuarioBuscado);
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const usuarioNuevo = new Usuario(input.idUsuario, input.nombreUsuario, input.apellidoUsuario, input.fechaNacimientoUsuario, input.cuitCliente, input.razonSocialCliente, input.telefonoCliente, input.idEmpleado, input.fechaContratacion, input.idTipoUsuario);
    const usuarioCreado = repository.add(usuarioNuevo);
    return res.status(201).send({ message: 'Se cargo nuevo usuario', data: usuarioCreado });
}
function update(req, res) {
    req.body.sanitizedInput.idusuario = req.params.idUsuario;
    const UsuarioModificado = repository.update(req.body.sanitizedInput);
    if (!UsuarioModificado) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(200).send({ message: 'Usuario actualizado correctamente', data: UsuarioModificado });
}
function remove(req, res) {
    const idUsuario = req.params.idUsuario;
    const UsuarioBorrar = repository.delete({ idUsuario });
    if (!UsuarioBorrar) {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
    else {
        res.status(200).send({ message: 'Usuario eliminado correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=usuario.controler.js.map