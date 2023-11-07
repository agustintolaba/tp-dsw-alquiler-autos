import { Entity, Property, ManyToOne , Rel} from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Alquiler extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'Date', columnType: 'date' })
  fechaRealizacionReserva!: Date
  
  @Property({ nullable: false, unique: false, type: 'date' })
  fechaHoraPactadaEntrega!: Date

  @Property({ nullable: false, unique: false, type: 'date' })
  fechaHoraPactadaDevolucion!: Date

  @Property({ nullable: true, unique: false, type: 'Date', columnType: 'date' })
  fechaCancelacion?: Date

  @Property({ nullable: true, unique: false, type: 'decimal', precision: 10, scale: 2 })
  precioTotal?: number

  @Property({ nullable: true, unique: false, type: 'date'})
  fechaHoraRealEntrega!: Date
  
  @Property({ nullable: true, unique: false, type: 'date' })
  fechaHoraRealDevolucion!: Date

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  estadoAlquiler!: string

  @ManyToOne(() => Usuario, { nullable: false })
  Usuario!: Rel<Usuario>

  @ManyToOne(() => Vehiculo, { nullable: false })
  Vehiculo!: Rel<Vehiculo>
}