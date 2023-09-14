import { SegurosRepository } from "./seguro.repository.js";
import { Seguro } from "./seguro.entity.js";
const repository = new SegurosRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        idSeguro: req.body.idSeguro,
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
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const idSeguro = req.params.idSeguro;
    const seguroBuscado = repository.findOne({ idSeguro });
    if (!seguroBuscado) {
        return res.status(404).send({ message: 'Seguro no encontrado' });
    }
    res.json(seguroBuscado);
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const seguroNuevo = new Seguro(input.idSeguro, input.nombreSeguro, input.companiaSeguro);
    const Nuevo = repository.add(seguroNuevo);
    return res.status(201).send({ message: 'Se cargo un nuevo Seguro', data: Nuevo });
}
function update(req, res) {
    req.body.sanitizedInput.idSeguro = req.params.idSeguro;
    const seguroMod = repository.update(req.body.sanitizedInput);
    if (!seguroMod) {
        return res.status(404).send({ message: 'Seguro no encontrado' });
    }
    return res.status(200).send({ message: 'Seguro actualizado correctamente', data: seguroMod });
}
function remove(req, res) {
    const idSeguro = req.params.idSeguro;
    const seguroBorrar = repository.delete({ idSeguro });
    if (!seguroBorrar) {
        res.status(404).send({ message: 'Seguro no encontrado' });
    }
    else {
        res.status(200).send({ message: 'Seguro eliminado correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=seguro.controler.js.map