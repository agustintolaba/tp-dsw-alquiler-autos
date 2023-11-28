import { Entity, Property, ManyToOne, OneToMany, Cascade, Rel } from "@mikro-orm/core";
import { TipoUsuario } from "../tipousuario/tipousuario.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";

@Entity()
export class Usuario extends BaseEntity {
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  nombre!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  apellido!: string

  @Property({ nullable: false, unique: false, type: 'Date', columnType: 'date' })
  fechaNacimiento!: Date

  @Property({ nullable: false, unique: false, type: 'string', length: 15 })
  numeroDocumento!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 15 })
  telefono!: string

  @Property({ nullable: true, unique: false, type: 'Date', columnType: 'date' })
  fechaContratacion!: Date

  @Property({ nullable: false, unique: true, type: 'string', length: 45 })
  email!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  password!: string

  @ManyToOne(() => TipoUsuario, { nullable: false, default: 2 })
  tipoUsuario!: Rel<TipoUsuario>

  @OneToMany(() => Alquiler, (alquiler) => alquiler.usuario, { cascade: [Cascade.ALL], })
  alquiler!: Rel<Alquiler>
}
