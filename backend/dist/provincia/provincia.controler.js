import { ProvinciaRepository } from "./provincia.repository.js";
import { Provincia } from "./provincias.entity.js";
const repository = new ProvinciaRepository();
function sanitizeProvinciaInput(req, res, next) {
    req.body.sanitizedInput = {
        idProvincia: req.body.idProvincia,
        descripcionProvincia: req.body.descripcionProvincia
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
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    /*const provincia= prov.find((prov)=> prov.idProvincia=== req.params.idProvincia)*/
    const idProvincia = req.params.idProvincia;
    const provincia = repository.findOne({ idProvincia });
    if (!provincia) {
        return res.status(404).send({ message: 'Provincia no encontrada' });
    }
    res.json(provincia);
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const provinciaNueva = new Provincia(input.idProvincia, input.descripcionProvincia);
    const ProvNueva = repository.add(provinciaNueva);
    return res.status(201).send({ message: 'Se cargo nueva provincia', data: ProvNueva });
}
function update(req, res) {
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)*/
    req.body.sanitizedInput.idProvincia = req.params.idProvincia; /*PARA MODIFICAR TAMBIEN EL ID*/
    const ProvMod = repository.update(req.body.sanitizedInput);
    if (!ProvMod) {
        return res.status(404).send({ message: 'Provincia no encontrada' });
    }
    /*prov[provinciaInx]={...prov[provinciaInx], ...req.body.sanitizedInput}  LO SACO PORQUE LA MODIFICACION SE HIXO EN EL UPDATE*/
    return res.status(200).send({ message: 'Provincia actualizada correctamente', data: ProvMod });
}
/*TAMBIEN SIRVE PARA EL PATCH */
function remove(req, res) {
    /*const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== req.params.idProvincia)*/
    const idProvincia = req.params.idProvincia;
    const ProvBorrar = repository.delete({ idProvincia });
    if (!ProvBorrar) {
        res.status(404).send({ message: 'Provincia no encontrada' });
    }
    else {
        /*prov.splice(provinciaInx,1)  QUEDA BORRADO EN EL DELETE*/
        res.status(200).send({ message: 'Provincia eliminada correctamente' });
    }
}
export { sanitizeProvinciaInput, findAll, findOne, add, update, remove };
/*TAMBIEN SE PUEDE HACER EL EXPORT MEDIANTE UN OBJETO, TAMBIEN CON CLASES PERO TENER CUIDADO CON EL THIS Y BINDING, EN ESE CASO LOS METODOS NO SON FLECHAS*/
/*SE USAN FUNCIONES POR EL BINDING, PERO SE PODRIA USAR OBJETOS O CLASES*/
//# sourceMappingURL=provincia.controler.js.map