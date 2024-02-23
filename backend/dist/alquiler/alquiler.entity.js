var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { Usuario } from "../usuario/usuario.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { BaseEntity } from "../shared/db/baseEntity.entity.js";
export let Alquiler = class Alquiler extends BaseEntity {
};
__decorate([
    Property({
        nullable: false,
        unique: false,
        type: "date",
        columnType: "date",
    }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaRealizacion", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "date" }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaDesde", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "date" }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaHasta", void 0);
__decorate([
    Property({ nullable: true, unique: false, type: "Date", columnType: "date" }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaCancelacion", void 0);
__decorate([
    Property({
        nullable: true,
        unique: false,
        type: "decimal",
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Alquiler.prototype, "precioTotal", void 0);
__decorate([
    Property({ nullable: true, unique: false, type: "date" }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaRealEntrega", void 0);
__decorate([
    Property({ nullable: true, unique: false, type: "date", columnType: "date" }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fechaRealDevolucion", void 0);
__decorate([
    Property({ nullable: false, unique: false, type: "string", length: 45 }),
    __metadata("design:type", String)
], Alquiler.prototype, "estado", void 0);
__decorate([
    ManyToOne(() => Usuario, { nullable: false }),
    __metadata("design:type", Object)
], Alquiler.prototype, "usuario", void 0);
__decorate([
    ManyToOne(() => Vehiculo, { nullable: false }),
    __metadata("design:type", Object)
], Alquiler.prototype, "vehiculo", void 0);
Alquiler = __decorate([
    Entity()
], Alquiler);
//# sourceMappingURL=alquiler.entity.js.map