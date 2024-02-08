import { Entity, Property, Cascade, OneToMany , Collection} from "@mikro-orm/core";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class TipoVehiculo extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  nombre!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 255 })
  descripcion!: string

  @Property({ nullable: false, unique: false, type: 'decimal', precision: 10, scale: 2 })
  precio!: number

  @Property({ nullable: true, unique: false, type: 'string', length: 150 })
  image?: string
  
  @OneToMany(() => Vehiculo, vehiculo => vehiculo.tipoVehiculo, {cascade: [Cascade.ALL], })
  vehiculos = new Collection<Vehiculo>(this)
}
