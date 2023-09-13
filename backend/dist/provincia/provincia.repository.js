import { Provincia } from "./provincias.entity.js";
const prov = [
    new Provincia('1', 'Santa Fe'),
];
export class ProvinciaRepository {
    findAll() {
        return prov;
    }
    findOne(item) {
        return prov.find((prov) => prov.idProvincia === item.idProvincia);
    }
    add(item) {
        prov.push(item);
        return item;
    }
    update(item) {
        const provinciaInx = prov.findIndex((prov) => prov.idProvincia === item.idProvincia);
        if (provinciaInx !== -1) {
            prov[provinciaInx] = { ...prov[provinciaInx], ...item };
        }
        return prov[provinciaInx];
    }
    delete(item) {
        const provinciaInx = prov.findIndex((prov) => prov.idProvincia === item.idProvincia);
        if (provinciaInx !== -1) {
            const deleteProvincia = prov[provinciaInx];
            prov.splice(provinciaInx, 1);
            return deleteProvincia;
        }
    }
}
//# sourceMappingURL=provincia.repository.js.map