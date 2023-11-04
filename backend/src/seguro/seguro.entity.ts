import { Entity, Property, Cascade, OneToMany , Rel} from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Seguro extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 25 })
  nombreSeguro!: string

  @Property({ nullable: false, unique: true, type: 'string', length: 25 })
  companiaSeguro!: string
  
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.idSeguro, {cascade: [Cascade.ALL], })
  vehiculo!: Rel<Vehiculo>
}