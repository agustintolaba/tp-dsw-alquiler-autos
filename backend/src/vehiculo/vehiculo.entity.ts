import { Entity, Property, ManyToOne , OneToMany, Cascade, Rel} from "@mikro-orm/core";
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js"; 
import { Seguro } from "../seguro/seguro.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Vehiculo extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  nombre!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  transmision!: string

  @Property({ nullable: false, unique: false })
  capacidad!: number

  @Property({ nullable: false, unique: false })
  disponible!: boolean

  @Property({ nullable: true, unique: false, type: 'string', length: 150 })
  image!: string
  
  @ManyToOne(() => TipoVehiculo, { nullable: false })
  tipoVehiculo!: Rel<TipoVehiculo>

  @ManyToOne(() => Seguro, { nullable: false })
  seguro!: Rel<Seguro>

  @ManyToOne(() => Sucursal, { nullable: false })
  sucursal!: Rel<Sucursal>

  @OneToMany(() => Alquiler, (alquiler) => alquiler.vehiculo, {cascade: [Cascade.ALL], })
  alquiler!: Rel<Alquiler>
}