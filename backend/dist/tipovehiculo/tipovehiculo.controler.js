import { TipoVehiculoRepository } from "./tipovehiculo.repository.js";
import { Tipo_Vehiculo } from "./tipovehiculo.entity.js";
const repository = new TipoVehiculoRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        descripcionTipoVehiculo: req.body.descripcionTipoVehiculo
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
    const tipoVehiculo = await repository.findOne({ id });
    if (!tipoVehiculo) {
        return res.status(404).send({ message: 'Tipo de vehiculo no encontrado' });
    }
    res.json(tipoVehiculo);
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const tipoVehiculoNuevo = new Tipo_Vehiculo(input.id, input.descripcionTipoVehiculo);
    const tipoNuevo = await repository.add(tipoVehiculoNuevo);
    return res.status(201).send({ message: 'Se cargo un nuevo tipo de vehiculo', data: tipoNuevo });
}
async function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const tipoVehiculoMod = await repository.update(req.body.sanitizedInput);
    if (!tipoVehiculoMod) {
        return res.status(404).send({ message: 'Tipo de vehiculo no encontrado' });
    }
    return res.status(200).send({ message: 'Tipo de vehiculo actualizado correctamente', data: tipoVehiculoMod });
}
async function remove(req, res) {
    const id = req.params.id;
    const tipoVehiculoBorrar = await repository.delete({ id });
    if (!tipoVehiculoBorrar) {
        res.status(404).send({ message: 'Tipo de vehiculo no encontrado' });
    }
    else {
        res.status(200).send({ message: 'Tipo de vehiculo eliminado correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=tipovehiculo.controler.js.map