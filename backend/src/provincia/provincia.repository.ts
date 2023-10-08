import { Repository } from "../shared/repository.js";
import { Provincia } from "./provincias.entity.js";
import { pooldb } from "../shared/db/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";


export class ProvinciaRepository implements Repository<Provincia>{
  public async findAll(): Promise<Provincia[] | undefined> {
    const [results] = await pooldb.query<RowDataPacket[]>('SELECT * FROM provincias')
     return results as Provincia[]
      /*SE DEBE MODIFICAR ESTA SALIDA EN CASO DE QUE UN ATRIBUTOS TENGA MUCHOS VALORES, TIPO OBJETO, HABRIA QUE HACER MAS CONSULTAS, ETC*/
      /*CODIGO PARA ESO:
      for (const provincia of resulst as Pronvicia[]) {
        const [items]= await pooldb.query('select itemName from ... where id=?', [pronvincia.id])
      provincia.item= (items as {itemName: string[]}).map((item)=> item.item.name)
      }
      return provincia as Provincia[]
      } NO CONCATENAR PORQUE GENERA VULNERABILIDADES*/
    }

  public async findOne(item: {id: string}): Promise<Provincia | undefined> {
    const id= Number.parseInt(item.id)
    const [provincia]= await pooldb.query<RowDataPacket[]>('Select * from provincias where id=?', [id])
    if (provincia.length ===0){
      return undefined
    }
    const miProvincia= provincia[0] as Provincia
    /*Aca deberia buscar mis items si tengo como en el anterior*/
    return miProvincia
  }

  public async add(provinciaInput: Provincia): Promise<Provincia | undefined> {
    const{id, ...provinciaRow}= provinciaInput
    const [result] = await pooldb.query<ResultSetHeader>('Insert into provincias set ?', [provinciaRow]) 
    provinciaInput.id=result.insertId /*Obtengo el id que fue autoincremental, para poder acceder a otras tablas*/
    /*Si tengo que insetar mas cosas en otra tabla, lo hago aca*/
    return provinciaInput
  }

  public async update(provinciaInput: Provincia): Promise<Provincia | undefined> {
    const{id, ...provinciaRow}= provinciaInput
    await pooldb.query('update provincias set ? where id=?', [provinciaRow, id])
    /*Si tengo que insetar mas cosas en otra tabla, lo hago aca*/
    const stringId= id.toString()
    return provinciaInput
    /*await this.findOne({id: stringId}) trivial la devolucion, en el patch la devolucion quedaria incompleta*/
  }

  public async delete(item: { id: string; }): Promise<Provincia | undefined> {
    /*Para borrar un row de una tabla, primero hay que borrar si tiene rows asociados en otras tablas, la cascada on delete tener en cuenta
    usar el await para que se borren en orden, la primera, y el then para que la segunda siga si no fallo la segunda*/
    try{const provinciaToBeDelete= this.findOne(item) /*Para devolver*/
    const provinciaId= Number.parseInt(item.id)
    await pooldb.query('delete from provincias where id=?', provinciaId)
    return provinciaToBeDelete
    } catch(error: any) {
        throw new Error('No se pudo borrar')
    }
  }
}