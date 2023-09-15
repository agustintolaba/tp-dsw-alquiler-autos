import { Seguro } from "./seguro.entity.js";
const MisSeguros = [
    new Seguro('1', 'Plan Gold', 'Sancor Seguros'),
];
export class SegurosRepository {
    findAll() {
        return MisSeguros;
    }
    findOne(item) {
        return MisSeguros.find((MisSeguros) => MisSeguros.id === item.id);
    }
    add(item) {
        MisSeguros.push(item);
        return item;
    }
    update(item) {
        const seguroInx = MisSeguros.findIndex((MisSeguros) => MisSeguros.id === item.id);
        if (seguroInx !== -1) {
            MisSeguros[seguroInx] = { ...MisSeguros[seguroInx], ...item };
        }
        return MisSeguros[seguroInx];
    }
    delete(item) {
        const seguroInx = MisSeguros.findIndex((MisSeguros) => MisSeguros.id === item.id);
        if (seguroInx !== -1) {
            const deleteSeguro = MisSeguros[seguroInx];
            MisSeguros.splice(seguroInx, 1);
            return deleteSeguro;
        }
    }
}
//# sourceMappingURL=seguro.repository.js.map