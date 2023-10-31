import { pooldb } from "../shared/db/conn.mysql.js";
export class UsuarioRepository {
    async findAll() {
        const [results] = await pooldb.query('SELECT * FROM usuarios');
        return results;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [usuario] = await pooldb.query('Select * from usuarios where id=?', [id]);
        if (usuario.length === 0) {
            return undefined;
        }
        const miUsuario = usuario[0];
        return miUsuario;
    }
    async add(usuarioInput) {
        const { id, ...usuarioRow } = usuarioInput;
        const [result] = await pooldb.query('Insert into usuarios set ?', [usuarioRow]);
        usuarioInput.id = result.insertId;
        return usuarioInput;
    }
    async update(usuarioInput) {
        const { id, ...usuarioRow } = usuarioInput;
        await pooldb.query('update usuarios set ? where id=?', [usuarioRow, id]);
        return usuarioInput;
    }
    async delete(item) {
        try {
            const usuarioToBeDelete = this.findOne(item);
            const usuarioId = Number.parseInt(item.id);
            await pooldb.query('delete from usuarios where id=?', usuarioId);
            return usuarioToBeDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar');
        }
    }
}
//# sourceMappingURL=usuario.repository.js.map