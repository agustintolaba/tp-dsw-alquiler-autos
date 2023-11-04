import { Entity, Property, Cascade, OneToMany } from "@mikro-orm/core";
import { Localidad } from "../localidad/localidad.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Provincia extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 25 })
  descripcionProvincia!: string
  
  @OneToMany(() => Localidad, (localidad) => localidad.idProvincia, {cascade: [Cascade.ALL], })
  idLocalidad!: Localidad
}
