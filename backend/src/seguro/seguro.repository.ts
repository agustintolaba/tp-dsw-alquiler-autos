import { Repository } from "../shared/repository.js";
import { Seguro } from "./seguro.entity.js";
import { pooldb } from "../shared/db/conn.mysql.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class SegurosRepository implements Repository<Seguro>{
  
  public async findAll(): Promise<Seguro[] | undefined> {
      const [results] = await pooldb.query('SELECT * FROM seguros')
      return results as Seguro[] 
    }
  
  public async findOne(item: {id: string}): Promise<Seguro | undefined> {
    const id= Number.parseInt(item.id)
    const [seguro]= await pooldb.query<RowDataPacket[]>('Select * from seguros where id=?', [id])
    if (seguro.length ===0){
      return undefined
    }
    const miSeguro= seguro[0] as Seguro
    return miSeguro
  }

  public async add(seguroInput: Seguro): Promise<Seguro | undefined> {
    const{id, ...seguroRow}= seguroInput
    const [result] = await pooldb.query<ResultSetHeader>('Insert into seguros set ?', [seguroRow]) 
    seguroInput.id=result.insertId 
    return seguroInput
  }

  public async update(seguroInput: Seguro): Promise<Seguro | undefined> {
    const{id, ...seguroRow}= seguroInput
    await pooldb.query('update seguros set ? where id=?', [seguroRow, id])
    return seguroInput
  }

  public async delete(item: { id: string; }): Promise<Seguro | undefined> {
    try{const seguroToBeDelete= this.findOne(item) 
    const seguroId= Number.parseInt(item.id)
    await pooldb.query('delete from seguros where id=?', seguroId)
    return seguroToBeDelete
    } catch(error: any) {
        throw new Error('No se pudo borrar')
    }
  }
}