import { RepositoryUsuario } from "../shared/repository.js";
import { Usuario} from "./usuario.entity.js";

const MisUsuarios= [
  new Usuario(
    '1', 'Nicolas', 'Perez', '20000101', '2040000230', 'Sagrada Familia', '341565656', '','','1-Cliente'
  ),
]

export class UsuarioRepository implements RepositoryUsuario<Usuario>{
  public findAll(): Usuario[] | undefined {
    return MisUsuarios
  }

  public findOne(item: {idUsuario: string}): Usuario | undefined {
    return MisUsuarios.find((MisUsuarios)=> MisUsuarios.idUsuario=== item.idUsuario)
  }

  public add(item: Usuario): Usuario | undefined {
    MisUsuarios.push(item)
    return item
  }

  public update(item: Usuario): Usuario | undefined {
    const usuarioInx= MisUsuarios.findIndex((MisUsuarios)=> MisUsuarios.idUsuario=== item.idUsuario)
    if(usuarioInx!==-1){
     MisUsuarios[usuarioInx]={...MisUsuarios[usuarioInx], ...item}
    } 
    return MisUsuarios[usuarioInx]
  }

  public delete(item: { idUsuario: string; }): Usuario | undefined {
    const usuarioInx= MisUsuarios.findIndex((MisUsuarios)=> MisUsuarios.idUsuario=== item.idUsuario)
    if(usuarioInx!==-1){
      const deleteUsuario= MisUsuarios[usuarioInx]
      MisUsuarios.splice(usuarioInx,1)
      return deleteUsuario
    }
  }
}