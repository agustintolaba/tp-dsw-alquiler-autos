import { Tipo_Vehiculo } from "./tipovehiculo.entity.js";
const MisTiposVehiculos = [
    new Tipo_Vehiculo('1', 'Camioneta'),
];
export class TipoVehiculoRepository {
    findAll() {
        return MisTiposVehiculos;
    }
    findOne(item) {
        return MisTiposVehiculos.find((MisTiposVehiculos) => MisTiposVehiculos.id === item.id);
    }
    add(item) {
        MisTiposVehiculos.push(item);
        return item;
    }
    update(item) {
        const tipoInx = MisTiposVehiculos.findIndex((MisTiposVehiculos) => MisTiposVehiculos.id === item.id);
        if (tipoInx !== -1) {
            MisTiposVehiculos[tipoInx] = { ...MisTiposVehiculos[tipoInx], ...item };
        }
        return MisTiposVehiculos[tipoInx];
    }
    delete(item) {
        const tipoInx = MisTiposVehiculos.findIndex((MisTiposVehiculos) => MisTiposVehiculos.id === item.id);
        if (tipoInx !== -1) {
            const deleteTipoVehiculo = MisTiposVehiculos[tipoInx];
            MisTiposVehiculos.splice(tipoInx, 1);
            return deleteTipoVehiculo;
        }
    }
}
//# sourceMappingURL=tipovehiculo.repository.js.map