import { Entity, Property, ManyToOne , OneToMany, Cascade, Rel} from "@mikro-orm/core";
import { TipoUsuario } from "../tipousuario/tipousuario.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";

@Entity()
export class Usuario extends BaseEntity{
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  nombreUsuario!: string
  
  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  apellidoUsuario!: string

  @Property({ nullable: false, unique: false, type: 'Date', columnType: 'date'})
  fechaNacimientoUsuario!: Date

  @Property({ nullable: false, unique: false, type: 'string', length: 15 })
  cuitCliente!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 45 })
  razonSocialCliente!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 15 })
  telefonoCliente!: string
  
   @Property({ nullable: true, unique: false, type: 'Date', columnType: 'date'})
  fechaContratacion!: Date

  @Property({ nullable: false, unique: true, type: 'string', length: 45 })
  mailCliente!: string

  @Property({ nullable: false, unique: false, type: 'string', length: 8 })
  passwordCliente!: string

  @ManyToOne(() => TipoUsuario, { nullable: false })
  tipoUsuario!: Rel<TipoUsuario>

  @OneToMany(() => Alquiler, (alquiler) => alquiler.usuario, {cascade: [Cascade.ALL], })
  alquiler!: Rel<Alquiler>

  @OneToMany(() => Sucursal, (sucursal) => sucursal.gerente, {cascade: [Cascade.ALL], })
  sucursal?: Rel<Sucursal>
}
