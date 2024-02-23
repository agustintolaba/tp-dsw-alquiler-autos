var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Cascade, } from "@mikro-orm/core";
import { TipoVehiculo } from "../tipovehiculo/tipovehiculo.entity.js";
import { Sucursal } from "../sucursal/sucursal.entity.js";
import { Alquiler } from "../alquiler/alquiler.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
export let Vehiculo = class Vehiculo extends BaseEntity {
};
__decorate([
    Property({ nullable: false, unique: false, type: "string", length: 45 }),
    __metadata("design:type", String)
], Vehiculo.prototype, "marca", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "string", length: 45 }),
    __metadata("design:type", String)
], Vehiculo.prototype, "modelo", void 0);
__decorate([
    Property({ nullable: false, unique: true, type: "string", length: 7 }),
    __metadata("design:type", String)
], Vehiculo.prototype, "patente", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "string", length: 45 }),
    __metadata("design:type", String)
], Vehiculo.prototype, "transmision", void 0);
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "year", void 0);
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "km", void 0);
__decorate([
    Property({ nullable: false, unique: false }),
    __metadata("design:type", Number)
], Vehiculo.prototype, "capacidad", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "string", length: 255 }),
    __metadata("design:type", String)
], Vehiculo.prototype, "image", void 0);
__decorate([
    ManyToOne(() => TipoVehiculo, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "tipoVehiculo", void 0);
__decorate([
    ManyToOne(() => Sucursal, { nullable: false }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "sucursal", void 0);
__decorate([
    OneToMany(() => Alquiler, (alquiler) => alquiler.vehiculo, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Vehiculo.prototype, "alquiler", void 0);
Vehiculo = __decorate([
    Entity()
], Vehiculo);
//# sourceMappingURL=vehiculo.entity.js.map