import { Usuario } from "./usuario.entity.js";
const MisUsuarios = [
    new Usuario('1', 'Nicolas', 'Perez', '20000101', '2040000230', 'Sagrada Familia', '341565656', '', '', '1-Cliente'),
];
export class UsuarioRepository {
    findAll() {
        return MisUsuarios;
    }
    findOne(item) {
        return MisUsuarios.find((MisUsuarios) => MisUsuarios.idUsuario === item.idUsuario);
    }
    add(item) {
        MisUsuarios.push(item);
        return item;
    }
    update(item) {
        const usuarioInx = MisUsuarios.findIndex((MisUsuarios) => MisUsuarios.idUsuario === item.idUsuario);
        if (usuarioInx !== -1) {
            MisUsuarios[usuarioInx] = { ...MisUsuarios[usuarioInx], ...item };
        }
        return MisUsuarios[usuarioInx];
    }
    delete(item) {
        const usuarioInx = MisUsuarios.findIndex((MisUsuarios) => MisUsuarios.idUsuario === item.idUsuario);
        if (usuarioInx !== -1) {
            const deleteUsuario = MisUsuarios[usuarioInx];
            MisUsuarios.splice(usuarioInx, 1);
            return deleteUsuario;
        }
    }
}
//# sourceMappingURL=usuario.repository.js.map