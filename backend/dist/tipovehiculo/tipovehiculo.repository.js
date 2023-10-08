import { pooldb } from "../shared/db/conn.mysql.js";
export class TipoVehiculoRepository {
    async findAll() {
        const [results] = await pooldb.query('SELECT * FROM tipo_vehiculo');
        return results;
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [tipo] = await pooldb.query('Select * from tipo_vehiculo where id=?', [id]);
        if (tipo.length === 0) {
            return undefined;
        }
        const miTipo = tipo[0];
        return miTipo;
    }
    async add(tipoInput) {
        const { id, ...tipoRow } = tipoInput;
        const [result] = await pooldb.query('Insert into tipo_vehiculo set ?', [tipoRow]);
        tipoInput.id = result.insertId;
        return tipoInput;
    }
    async update(tipoInput) {
        const { id, ...tipoRow } = tipoInput;
        await pooldb.query('update tipo_vehiculo set ? where id=?', [tipoRow, id]);
        return tipoInput;
    }
    async delete(item) {
        try {
            const tipoToBeDelete = this.findOne(item);
            const tipoId = Number.parseInt(item.id);
            await pooldb.query('delete from tipo_vehiculo where id=?', tipoId);
            return tipoToBeDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar');
        }
    }
}
//# sourceMappingURL=tipovehiculo.repository.js.map