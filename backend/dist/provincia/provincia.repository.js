import { pooldb } from "../shared/db/conn.mysql.js";
export class ProvinciaRepository {
    async findAll() {
        const [results] = await pooldb.query('SELECT * FROM provincias');
        return results;
        /*SE DEBE MODIFICAR ESTA SALIDA EN CASO DE QUE UN ATRIBUTOS TENGA MUCHOS VALORES, TIPO OBJETO, HABRIA QUE HACER MAS CONSULTAS, ETC*/
        /*CODIGO PARA ESO:
        for (const provincia of resulst as Pronvicia[]) {
          const [items]= await pooldb.query('select itemName from ... where id=?', [pronvincia.id])
        provincia.item= (items as {itemName: string[]}).map((item)=> item.item.name)
        }
        return provincia as Provincia[]
        } NO CONCATENAR PORQUE GENERA VULNERABILIDADES*/
    }
    async findOne(item) {
        const id = Number.parseInt(item.id);
        const [provincia] = await pooldb.query('Select * from provincias where id=?', [id]);
        if (provincia.length === 0) {
            return undefined;
        }
        const miProvincia = provincia[0];
        /*Aca deberia buscar mis items si tengo como en el anterior*/
        return miProvincia;
    }
    async add(provinciaInput) {
        const { id, ...provinciaRow } = provinciaInput;
        const [result] = await pooldb.query('Insert into provincias set ?', [provinciaRow]);
        provinciaInput.id = result.insertId; /*Obtengo el id que fue autoincremental, para poder acceder a otras tablas*/
        /*Si tengo que insetar mas cosas en otra tabla, lo hago aca*/
        return provinciaInput;
    }
    async update(provinciaInput) {
        const { id, ...provinciaRow } = provinciaInput;
        await pooldb.query('update provincias set ? where id=?', [provinciaRow, id]);
        /*Si tengo que insetar mas cosas en otra tabla, lo hago aca*/
        const stringId = id.toString();
        return provinciaInput;
        /*await this.findOne({id: stringId}) trivial la devolucion, en el patch la devolucion quedaria incompleta*/
    }
    async delete(item) {
        /*Para borrar un row de una tabla, primero hay que borrar si tiene rows asociados en otras tablas, la cascada on delete tener en cuenta
        usar el await para que se borren en orden, la primera, y el then para que la segunda siga si no fallo la segunda*/
        try {
            const provinciaToBeDelete = this.findOne(item); /*Para devolver*/
            const provinciaId = Number.parseInt(item.id);
            await pooldb.query('delete from provincias where id=?', provinciaId);
            return provinciaToBeDelete;
        }
        catch (error) {
            throw new Error('No se pudo borrar');
        }
    }
}
//# sourceMappingURL=provincia.repository.js.map