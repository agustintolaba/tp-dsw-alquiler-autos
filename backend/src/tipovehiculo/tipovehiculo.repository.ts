import { Repository } from "../shared/repository.js";
import { Tipo_Vehiculo } from "./tipovehiculo.entity.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pooldb } from "../shared/db/conn.mysql.js";

export class TipoVehiculoRepository implements Repository<Tipo_Vehiculo>{
  
  public async findAll(): Promise<Tipo_Vehiculo[] | undefined> {
      const [results] = await pooldb.query('SELECT * FROM tipo_vehiculo')
      return results as Tipo_Vehiculo[] 
    }

  public async findOne(item: {id: string}): Promise<Tipo_Vehiculo | undefined> {
    const id= Number.parseInt(item.id)
    const [tipo]= await pooldb.query<RowDataPacket[]>('Select * from tipo_vehiculo where id=?', [id])
    if (tipo.length ===0){
      return undefined
    }
    const miTipo= tipo[0] as Tipo_Vehiculo
    return miTipo
  }

  public async add(tipoInput: Tipo_Vehiculo): Promise<Tipo_Vehiculo | undefined> {
    const{id, ...tipoRow}= tipoInput
    const [result] = await pooldb.query<ResultSetHeader>('Insert into tipo_vehiculo set ?', [tipoRow]) 
    tipoInput.id=result.insertId 
    return tipoInput
  }

  public async update(tipoInput: Tipo_Vehiculo): Promise<Tipo_Vehiculo | undefined> {
    const{id, ...tipoRow}= tipoInput
    await pooldb.query('update tipo_vehiculo set ? where id=?', [tipoRow, id])
    return tipoInput
  }

  public async delete(item: { id: string; }): Promise<Tipo_Vehiculo | undefined> {
    try{const tipoToBeDelete= this.findOne(item) 
    const tipoId= Number.parseInt(item.id)
    await pooldb.query('delete from tipo_vehiculo where id=?', tipoId)
    return tipoToBeDelete
    } catch(error: any) {
        throw new Error('No se pudo borrar')
    }
  }
}