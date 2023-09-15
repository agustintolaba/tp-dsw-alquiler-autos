import { Repository } from "../shared/repository.js";
import { Tipo_Vehiculo } from "./tipovehiculo.entity.js";

const MisTiposVehiculos= [
  new Tipo_Vehiculo(
    '1', 'Camioneta'
  ),
]

export class TipoVehiculoRepository implements Repository<Tipo_Vehiculo>{
  public findAll(): Tipo_Vehiculo[] | undefined {
    return MisTiposVehiculos
  }

  public findOne(item: {id: string}): Tipo_Vehiculo | undefined {
    return MisTiposVehiculos.find((MisTiposVehiculos)=> MisTiposVehiculos.id=== item.id)
  }

  public add(item: Tipo_Vehiculo): Tipo_Vehiculo | undefined {
    MisTiposVehiculos.push(item)
    return item
  }

  public update(item: Tipo_Vehiculo): Tipo_Vehiculo | undefined {
    const tipoInx= MisTiposVehiculos.findIndex((MisTiposVehiculos)=> MisTiposVehiculos.id=== item.id)
    if(tipoInx!==-1){
     MisTiposVehiculos[tipoInx]={...MisTiposVehiculos[tipoInx], ...item}
    } 
    return MisTiposVehiculos[tipoInx]
  }

  public delete(item: { id: string; }): Tipo_Vehiculo | undefined {
    const tipoInx= MisTiposVehiculos.findIndex((MisTiposVehiculos)=> MisTiposVehiculos.id=== item.id)
    if(tipoInx!==-1){
      const deleteTipoVehiculo= MisTiposVehiculos[tipoInx]
      MisTiposVehiculos.splice(tipoInx,1)
      return deleteTipoVehiculo
    }
  }
}