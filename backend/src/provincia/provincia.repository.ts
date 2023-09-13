import { Repository } from "../shared/repository.js";
import { Provincia } from "./provincias.entity.js";

const prov= [
  new Provincia(
    '1', 'Santa Fe'
  ),
]

export class ProvinciaRepository implements Repository<Provincia>{
  public findAll(): Provincia[] | undefined {
    return prov
  }

  public findOne(item: {idProvincia: string}): Provincia | undefined {
    return prov.find((prov)=> prov.idProvincia=== item.idProvincia)
  }

  public add(item: Provincia): Provincia | undefined {
    prov.push(item)
    return item
  }

  public update(item: Provincia): Provincia | undefined {
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== item.idProvincia)
    if(provinciaInx!==-1){
     prov[provinciaInx]={...prov[provinciaInx], ...item}
    } 
    return prov[provinciaInx]
  }

  public delete(item: { idProvincia: string; }): Provincia | undefined {
    const provinciaInx= prov.findIndex((prov)=> prov.idProvincia=== item.idProvincia)
    if(provinciaInx!==-1){
      const deleteProvincia= prov[provinciaInx]
      prov.splice(provinciaInx,1)
      return deleteProvincia
    }
  }
}