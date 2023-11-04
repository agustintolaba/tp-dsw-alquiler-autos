import { Entity, Property, ManyToOne , Rel} from "@mikro-orm/core";
import { Provincia } from "../provincia/provincias.entity.js"; 
import { BaseEntity } from "../shared/db/baseEntity.entity.js";

@Entity()
export class Localidad extends BaseEntity{
  @Property({ nullable: false, unique: true, type: 'string', length: 25 })
  nombreLocalidad!: string
  
  @ManyToOne(() => Provincia, { nullable: false })
  idProvincia!: Rel<Provincia>
}