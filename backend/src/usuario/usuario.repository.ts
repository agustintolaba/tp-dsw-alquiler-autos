import { Repository } from "../shared/repository.js";
import { Usuario} from "./usuario.entity.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pooldb } from "../shared/db/conn.mysql.js";

export class UsuarioRepository implements Repository<Usuario>{
  
  public async findAll(): Promise<Usuario[] | undefined> {
      const [results] = await pooldb.query('SELECT * FROM usuarios')
      return results as Usuario[] 
    }

  public async findOne(item: {id: string}): Promise<Usuario | undefined> {
    const id= Number.parseInt(item.id)
    const [usuario]= await pooldb.query<RowDataPacket[]>('Select * from usuarios where id=?', [id])
    if (usuario.length ===0){
      return undefined
    }
    const miUsuario= usuario[0] as Usuario
    return miUsuario
  }

  public async add(usuarioInput: Usuario): Promise<Usuario | undefined> {
    const{id, ...usuarioRow}= usuarioInput
    const [result] = await pooldb.query<ResultSetHeader>('Insert into usuarios set ?', [usuarioRow]) 
    usuarioInput.id=result.insertId 
    return usuarioInput
  }

  public async update(usuarioInput: Usuario): Promise<Usuario | undefined> {
    const{id, ...usuarioRow}= usuarioInput
    await pooldb.query('update usuarios set ? where id=?', [usuarioRow, id])
    return usuarioInput
  }

  public async delete(item: { id: string; }): Promise<Usuario | undefined> {
    try{const usuarioToBeDelete= this.findOne(item) 
    const usuarioId= Number.parseInt(item.id)
    await pooldb.query('delete from usuarios where id=?', usuarioId)
    return usuarioToBeDelete
    } catch(error: any) {
        throw new Error('No se pudo borrar')
    }
  }
}