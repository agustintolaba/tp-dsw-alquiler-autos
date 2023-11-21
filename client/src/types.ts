export interface Identifiable {
    id: number
}

export interface Descriptible {
    description: string
}

export type SelectMenuItem = Identifiable & Descriptible

export type TipoUsuario = Identifiable & Descriptible

export interface Usuario extends Identifiable {
    name: string,
    surname: string,
    bornDate: string,
    numeroDocumento: string,
    phoneNumber: string,
    type: TipoUsuario
}

export interface Vehiculo {
    id: number,
    marca: string,
    modelo: string,
    transmision: string,
    capacidad: number,
    año: string,
    image: string
    tipoVehiculo: TipoVehiculo
    seguro: Seguro
}

export interface Reserva {
    id: number,
    fechaRealizacion: string,
    fechaDesde: string,
    fechaHasta: string,
    fechaRealEntrega: string,
    fechaRealDevolucion: string,
    estado: string,
    vehiculo: Vehiculo,
    usuario: Usuario
}

export interface TipoVehiculo {
    id: number,
    nombre: string,
    descripcion: string,
    precio: number,
    image: string
}

export interface Seguro {
    id: number,
    nombre: string,
    compania: string
}