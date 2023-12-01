export interface Identifiable {
    id: number
}

export interface Descriptible {
    descripcion: string
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

export interface Vehiculo extends Identifiable {
    id: number,
    marca: string,
    modelo: string,
    transmision: string,
    capacidad: number,
    year: string,
    km: number,
    image: string
    tipoVehiculo: TipoVehiculo
}

export interface Reserva extends Identifiable {
    fechaRealizacion: string,
    fechaDesde: string,
    fechaHasta: string,
    fechaRealEntrega: string,
    fechaRealDevolucion: string,
    estado: string,
    vehiculo: Vehiculo,
    usuario: Usuario
}

export interface TipoVehiculo extends Identifiable {
    nombre: string,
    descripcion: string,
    precio: number,
    image: string
}

export interface Sucursal extends Identifiable {
    calle: string,
    numeroCalle: string
    localidad: Localidad
}

export interface Localidad extends Identifiable, Descriptible {    
    provincia: Provincia    
}

export interface Provincia extends Identifiable, Descriptible {
    localidades: Localidad[]    
}