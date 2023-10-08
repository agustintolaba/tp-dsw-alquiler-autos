import { pooldb } from "../shared/db/conn.mysql.js";
export class SegurosRepository {
    async findAll() {
        const [results] = await pooldb.query('SELECT * FROM seguros');
        return results;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [seguro] = await pooldb.query('Select * from seguros where id=?', [id]);
        if (seguro.length === 0) {
            return undefined;
        }
        const miSeguro = seguro[0];
        return miSeguro;
    }
    async add(seguroInput) {
        const { id, ...seguroRow } = seguroInput;
        const [result] = await pooldb.query('Insert into seguros set ?', [seguroRow]);
        seguroInput.id = result.insertId;
        return seguroInput;
    }
    async update(seguroInput) {
        const { id, ...seguroRow } = seguroInput;
        await pooldb.query('update seguros set ? where id=?', [seguroRow, id]);
        return seguroInput;
    }
    async delete(item) {
        try {
            const seguroToBeDelete = this.findOne(item);
            const seguroId = Number.parseInt(item.id);
            await pooldb.query('delete from seguros where id=?', seguroId);
            return seguroToBeDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar');
        }
    }
}
//# sourceMappingURL=seguro.repository.js.map