import { Repository } from "../shared/repository.js";
import { Provincia } from "./provincias.entity.js";

const MisProvincias= [
  new Provincia(
    '1', 'Santa Fe'
  ),
]

export class ProvinciaRepository implements Repository<Provincia>{
  public findAll(): Provincia[] | undefined {
    return MisProvincias
  }

  public findOne(item: {id: string}): Provincia | undefined {
    return MisProvincias.find((MisProvincias)=> MisProvincias.id=== item.id)
  }

  public add(item: Provincia): Provincia | undefined {
    MisProvincias.push(item)
    return item
  }

  public update(item: Provincia): Provincia | undefined {
    const provinciaInx= MisProvincias.findIndex((MisProvincias)=> MisProvincias.id=== item.id)
    if(provinciaInx!==-1){
     MisProvincias[provinciaInx]={...MisProvincias[provinciaInx], ...item}
    } 
    return MisProvincias[provinciaInx]
  }

  public delete(item: { id: string; }): Provincia | undefined {
    const provinciaInx= MisProvincias.findIndex((MisProvincias)=> MisProvincias.id=== item.id)
    if(provinciaInx!==-1){
      const deleteProvincia= MisProvincias[provinciaInx]
      MisProvincias.splice(provinciaInx,1)
      return deleteProvincia
    }
  }
}