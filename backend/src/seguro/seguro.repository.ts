import { Repository } from "../shared/repository.js";
import { Seguro } from "./seguro.entity.js";

const MisSeguros= [
  new Seguro(
    '1', 'Plan Gold', 'Sancor Seguros'
  ),
]

export class SegurosRepository implements Repository<Seguro>{
  public findAll(): Seguro[] | undefined {
    return MisSeguros
  }

  public findOne(item: {id: string}): Seguro | undefined {
    return MisSeguros.find((MisSeguros)=> MisSeguros.id=== item.id)
  }

  public add(item: Seguro): Seguro | undefined {
    MisSeguros.push(item)
    return item
  }

  public update(item: Seguro): Seguro | undefined {
    const seguroInx= MisSeguros.findIndex((MisSeguros)=> MisSeguros.id=== item.id)
    if(seguroInx!==-1){
     MisSeguros[seguroInx]={...MisSeguros[seguroInx], ...item}
    } 
    return MisSeguros[seguroInx]
  }

  public delete(item: { id: string; }): Seguro | undefined {
    const seguroInx= MisSeguros.findIndex((MisSeguros)=> MisSeguros.id=== item.id)
    if(seguroInx!==-1){
      const deleteSeguro= MisSeguros[seguroInx]
      MisSeguros.splice(seguroInx,1)
      return deleteSeguro
    }
  }
}