import { Entity, Property, ManyToOne , OneToMany, Cascade, Rel} from "@mikro-orm/core";
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js"; 
import { Seguro } from "../seguro/seguro.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Vehiculo extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  trasmision!: string

  @Property({ nullable: false, unique: false })
  capacidad!: number

  @Property({ nullable: false, unique: false })
  disponible!: boolean
  
  @ManyToOne(() => TipoVehiculo, { nullable: false })
  idTipoVehiculo!: Rel<TipoVehiculo>

  @ManyToOne(() => Seguro, { nullable: false })
  idSeguro!: Rel<Seguro>

  @ManyToOne(() => Sucursal, { nullable: false })
  idSucursal!: Rel<Sucursal>

  @OneToMany(() => Alquiler, (alquiler) => alquiler.idVehiculo, {cascade: [Cascade.ALL], })
  alquiler!: Rel<Alquiler>
}