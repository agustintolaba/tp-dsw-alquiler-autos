var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Cascade, OneToMany } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
export let TipoUsuario = class TipoUsuario extends BaseEntity {
};
__decorate([
    Property({ nullable: false, unique: true, type: 'string', length: 45 }),
    __metadata("design:type", String)
], TipoUsuario.prototype, "descripcion", void 0);
__decorate([
    OneToMany(() => Usuario, (usuario) => usuario.tipoUsuario, { cascade: [Cascade.ALL], }),
    __metadata("design:type", Object)
], TipoUsuario.prototype, "usuario", void 0);
TipoUsuario = __decorate([
    Entity()
], TipoUsuario);
//# sourceMappingURL=tipousuario.entity.js.map