import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Cascade,
  Rel,
} from "@mikro-orm/core";
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Vehiculo extends BaseEntity {
  @Property({ nullable: false, unique: false, type: "string", length: 45 })
  marca!: string;

  @Property({ nullable: false, unique: false, type: "string", length: 45 })
  modelo!: string;

  @Property({ nullable: false, unique: true, type: "string", length: 7 })
  patente!: string;

  @Property({ nullable: false, unique: false, type: "string", length: 45 })
  transmision!: string;

  @Property({ nullable: false, unique: false })
  year!: number;

  @Property({ nullable: false, unique: false })
  km!: number;

  @Property({ nullable: false, unique: false })
  capacidad!: number;

  @Property({ nullable: false, unique: false, type: "string", length: 255 })
  image!: string;

  @ManyToOne(() => TipoVehiculo, { nullable: false })
  tipoVehiculo!: Rel<TipoVehiculo>;

  @ManyToOne(() => Sucursal, { nullable: false })
  sucursal!: Rel<Sucursal>;

  @OneToMany(() => Alquiler, (alquiler) => alquiler.vehiculo, {
    cascade: [Cascade.ALL],
  })
  alquiler!: Rel<Alquiler>;
}
