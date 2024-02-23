import { orm } from "../shared/db/orm.js";
import { Sucursal } from "./sucursal.entity.js";
const em = orm.em;
function sanitizeSucursalInput(req, res, next) {
    req.body.sanitizedInput = {
        id: req.body.id,
        calle: req.body.calle,
        numeroCalle: req.body.numeroCalle,
        localidad: req.body.localidad
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
        const sucursales = await em.find(Sucursal, {}, { populate: ['localidad', 'localidad.provincia'] });
        res.status(200).json({ message: 'Sucursales encontradas', branches: sucursales });
    }
    catch (error) {
        res.status(500).json({ message: 'No se encontraron sucursales', data: error });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const sucursal = await em.findOneOrFail(Sucursal, { id }, { populate: ['localidad', 'localidad.provincia'] });
        res.status(200).json({ message: 'Sucursal encontrada', sucursal: sucursal });
    }
    catch (error) {
        res.status(500).json({ message: 'No se encontro sucursal', data: error });
    }
}
async function add(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const input = req.body.sanitizedInput;
            const sucursalNueva = em.create(Sucursal, input);
            await em.flush();
            res.status(201).json({ message: 'Se cargo nueva sucursal', data: sucursalNueva });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo cargar la nueva sucursal', data: error });
    }
}
async function update(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const id = Number.parseInt(req.params.id);
            const sucursalExistente = await em.findOne(Sucursal, { id });
            if (!sucursalExistente) {
                return res.status(404).json({ message: 'La sucursal no existe' });
            }
            req.body.sanitizedInput.id = req.params.id;
            const sucursalModificada = em.getReference(Sucursal, id);
            em.assign(sucursalModificada, req.body.sanitizedInput);
            await em.flush();
            res.status(200).json({ message: 'Sucursal actualizada correctamente' });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo actualizar la sucursal', data: error });
    }
}
async function remove(req, res) {
    try {
        const isAdmin = req.isAdmin;
        if (isAdmin) {
            const id = Number.parseInt(req.params.id);
            const sucursalExistente = await em.findOne(Sucursal, { id });
            if (!sucursalExistente) {
                return res.status(404).json({ message: 'La sucursal no existe' });
            }
            const sucursalBorrar = em.getReference(Sucursal, id);
            await em.removeAndFlush(sucursalBorrar);
            res.status(200).send({ message: 'Sucursal eliminada correctamente' });
        }
        else {
            res.status(401).json({ message: "No tiene acceso" });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'No se pudo eliminar la sucursal', data: error });
    }
}
export { sanitizeSucursalInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=sucursal.controler.js.map