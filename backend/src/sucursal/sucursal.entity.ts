import { Entity, Property, Cascade, OneToMany, ManyToOne, Rel} from "@mikro-orm/core";
import { Localidad } from "../localidad/localidad.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";

@Entity()
export class Sucursal extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 25})
  calleSucursal!: string

  @Property({ nullable: false, unique: true, type: 'string', length: 8 })
  numeroCalleSucursal!: string
  
  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.idSucursal, {cascade: [Cascade.ALL], })
  vehiculo!: Rel<Vehiculo>

  @ManyToOne(() => Localidad, { nullable: false })
  idLocalidad!: Rel<Localidad>
}