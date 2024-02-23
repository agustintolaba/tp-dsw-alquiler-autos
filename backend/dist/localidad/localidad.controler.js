import { orm } from "../shared/db/orm.js";
import { Localidad } from "./localidad.entity.js";
const em = orm.em;
function sanitizeLocalidadInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        descripcion: req.body.descripcion,
        provincia: req.body.provincia
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
async function findAll(req, res) {
    try {
        const localidades = await em.find(Localidad, {}, { populate: ['provincia'] });
        res.status(200).json({ message: 'Localidades encontradas', data: localidades });
    }
    catch (error) {
        res.status(500).json({ message: 'No se encontraron localidades', data: error });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const localidadBuscada = await em.findOneOrFail(Localidad, { id }, { populate: ['provincia'] });
        res.status(200).json({ message: 'Localidad encontrada', data: localidadBuscada });
    }
    catch (error) {
        res.status(500).json({ message: 'No se encontro localidad', data: error });
    }
}
async function add(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const input = req.body.sanitizedInput;
            const localidadNueva = em.create(Localidad, input);
            await em.flush();
            res.status(201).json({ message: 'Se cargo nueva localidad', data: localidadNueva });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo cargar la nueva localidad', data: error });
    }
}
async function update(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const id = Number.parseInt(req.params.id);
            const localidadExistente = await em.findOne(Localidad, { id });
            if (!localidadExistente) {
                return res.status(404).json({ message: 'La localidad no existe' });
            }
            req.body.sanitizedInput.id = req.params.id;
            const localidadModificada = em.getReference(Localidad, id);
            em.assign(localidadModificada, req.body.sanitizedInput);
            await em.flush();
            res.status(200).json({ message: 'Localidad actualizada correctamente' });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo actualizar la localidad', data: error });
    }
}
async function remove(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const id = Number.parseInt(req.params.id);
            const localidadExistente = await em.findOne(Localidad, { id });
            if (!localidadExistente) {
                return res.status(404).json({ message: 'La localidad no existe' });
            }
            const localidadBorrar = em.getReference(Localidad, id);
            await em.removeAndFlush(localidadBorrar);
            res.status(200).send({ message: 'Localidad eliminada correctamente' });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar la localidad', data: error });
    }
}
export { sanitizeLocalidadInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=localidad.controler.js.map