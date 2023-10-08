import { SegurosRepository } from "./seguro.repository.js";
import { Seguro } from "./seguro.entity.js";
const repository = new SegurosRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        nombreSeguro: req.body.nombreSeguro,
        companiaSeguro: req.body.companiaSeguro
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
    const seguroBuscado = await repository.findOne({ id });
    if (!seguroBuscado) {
        return res.status(404).send({ message: 'Seguro no encontrado' });
    }
    res.json(seguroBuscado);
}
async function add(req, res) {
    const input = req.body.sanitizedInput;
    const seguroNuevo = new Seguro(input.id, input.nombreSeguro, input.companiaSeguro);
    const Nuevo = await repository.add(seguroNuevo);
    return res.status(201).send({ message: 'Se cargo un nuevo Seguro', data: Nuevo });
}
async function update(req, res) {
    req.body.sanitizedInput.id = req.params.id;
    const seguroMod = await repository.update(req.body.sanitizedInput);
    if (!seguroMod) {
        return res.status(404).send({ message: 'Seguro no encontrado' });
    }
    return res.status(200).send({ message: 'Seguro actualizado correctamente', data: seguroMod });
}
async function remove(req, res) {
    const id = req.params.id;
    const seguroBorrar = await repository.delete({ id });
    if (!seguroBorrar) {
        res.status(404).send({ message: 'Seguro no encontrado' });
    }
    else {
        res.status(200).send({ message: 'Seguro eliminado correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=seguro.controler.js.map