var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Cascade, OneToMany, ManyToOne } from "@mikro-orm/core";
import { Localidad } from "../localidad/localidad.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
export let Sucursal = class Sucursal extends BaseEntity {
};
__decorate([
    Property({ nullable: false, unique: false, type: 'string', length: 45 }),
    __metadata("design:type", String)
], Sucursal.prototype, "calle", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: 'string', length: 10 }),
    __metadata("design:type", String)
], Sucursal.prototype, "numeroCalle", void 0);
__decorate([
    OneToMany(() => Vehiculo, (vehiculo) => vehiculo.sucursal, { cascade: [Cascade.ALL], }),
    __metadata("design:type", Object)
], Sucursal.prototype, "vehiculo", void 0);
__decorate([
    ManyToOne(() => Localidad, { nullable: false }),
    __metadata("design:type", Object)
], Sucursal.prototype, "localidad", void 0);
Sucursal = __decorate([
    Entity()
], Sucursal);
//# sourceMappingURL=sucursal.entity.js.map