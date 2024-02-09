import { Entity, Property, ManyToOne, Rel } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Alquiler extends BaseEntity {
  @Property({
    nullable: false,
    unique: false,
    type: "date",
    columnType: "date",
  })
  fechaRealizacion!: Date;

  @Property({ nullable: false, unique: false, type: "date" })
  fechaDesde!: Date;

  @Property({ nullable: false, unique: false, type: "date" })
  fechaHasta!: Date;

  @Property({ nullable: true, unique: false, type: "Date", columnType: "date" })
  fechaCancelacion?: Date;

  @Property({
    nullable: true,
    unique: false,
    type: "decimal",
    precision: 10,
    scale: 2,
  })
  precioTotal?: number;

  @Property({ nullable: true, unique: false, type: "date" })
  fechaRealEntrega!: Date;

  @Property({ nullable: true, unique: false, type: "date", columnType: "date" })
  fechaRealDevolucion!: Date;

  @Property({ nullable: false, unique: false, type: "string", length: 45 })
  estado!: string;

  @ManyToOne(() => Usuario, { nullable: false })
  usuario!: Rel<Usuario>;

  @ManyToOne(() => Vehiculo, { nullable: false })
  vehiculo!: Rel<Vehiculo>;
}
