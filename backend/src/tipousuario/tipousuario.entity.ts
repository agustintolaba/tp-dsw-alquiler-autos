import { Entity, Property, Cascade, OneToMany , Rel} from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class TipoUsuario extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 45 })
  descripcionTipoUsuario!: string
  
  @OneToMany(() => Usuario, (usuario) => usuario.idTipoUsuario, {cascade: [Cascade.ALL], })
  usuario!: Rel<Usuario>
}