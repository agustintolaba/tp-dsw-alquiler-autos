import { UsuarioRepository } from "./usuario.repository.js";
import { Usuario } from "./usuario.entity.js";
const repository = new UsuarioRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
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
async function findAll(req, res) {
    res.json({ data: await repository.findAll() });
}
async function findOne(req, res) {
    const id = req.params.id;
    const usuarioBuscado = await repository.findOne({ id });
    if (!usuarioBuscado) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    res.json(usuarioBuscado);
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const usuarioNuevo = new Usuario(input.id, input.nombreUsuario, input.apellidoUsuario, input.fechaNacimientoUsuario, input.cuitCliente, input.razonSocialCliente, input.telefonoCliente, input.idEmpleado, input.fechaContratacion, input.idTipoUsuario);
    const usuarioCreado = await repository.add(usuarioNuevo);
    return res.status(201).send({ message: 'Se cargo nuevo usuario', data: usuarioCreado });
}
async function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const UsuarioModificado = await repository.update(req.body.sanitizedInput);
    if (!UsuarioModificado) {
        return res.status(404).send({ message: 'Usuario no encontrado' });
    }
    return res.status(200).send({ message: 'Usuario actualizado correctamente', data: UsuarioModificado });
}
async function remove(req, res) {
    const id = req.params.id;
    const UsuarioBorrar = await repository.delete({ id });
    if (!UsuarioBorrar) {
        res.status(404).send({ message: 'Usuario no encontrado' });
    }
    else {
        res.status(200).send({ message: 'Usuario eliminado correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=usuario.controler.js.map