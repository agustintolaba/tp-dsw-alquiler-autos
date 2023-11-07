import { Entity, Property, Cascade, OneToMany } from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class TipoVehiculo extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 45 })
  descripcionTipoVehiculo!: string

  @Property({ nullable: false, unique: false, type: 'decimal', precision: 10, scale: 2 })
  precioDiaTipoVehiculo!: number
  
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.TipoVehiculo, {cascade: [Cascade.ALL], })
  vehiculo!: Vehiculo
}
