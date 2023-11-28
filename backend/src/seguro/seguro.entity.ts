import { Entity, Property, Cascade, OneToMany , Rel} from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Seguro extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  nombre!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  compania!: string
  
  //@OneToMany(() => Vehiculo, (vehiculo) => vehiculo.seguro, {cascade: [Cascade.ALL], })
  //vehiculo!: Rel<Vehiculo>
}