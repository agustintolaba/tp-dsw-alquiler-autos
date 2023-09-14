import { Provincia } from "./provincias.entity.js";
const MisProvincias = [
    new Provincia('1', 'Santa Fe'),
];
export class ProvinciaRepository {
    findAll() {
        return MisProvincias;
    }
    findOne(item) {
        return MisProvincias.find((MisProvincias) => MisProvincias.idProvincia === item.idProvincia);
    }
    add(item) {
        MisProvincias.push(item);
        return item;
    }
    update(item) {
        const provinciaInx = MisProvincias.findIndex((MisProvincias) => MisProvincias.idProvincia === item.idProvincia);
        if (provinciaInx !== -1) {
            MisProvincias[provinciaInx] = { ...MisProvincias[provinciaInx], ...item };
        }
        return MisProvincias[provinciaInx];
    }
    delete(item) {
        const provinciaInx = MisProvincias.findIndex((MisProvincias) => MisProvincias.idProvincia === item.idProvincia);
        if (provinciaInx !== -1) {
            const deleteProvincia = MisProvincias[provinciaInx];
            MisProvincias.splice(provinciaInx, 1);
            return deleteProvincia;
        }
    }
}
//# sourceMappingURL=provincia.repository.js.map