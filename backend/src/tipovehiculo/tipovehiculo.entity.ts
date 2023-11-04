import { Entity, Property, Cascade, OneToMany } from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class TipoVehiculo extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 25 })
  descripcionTipoVehiculo!: string
  
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.idTipoVehiculo, {cascade: [Cascade.ALL], })
  vehiculo!: Vehiculo
}
