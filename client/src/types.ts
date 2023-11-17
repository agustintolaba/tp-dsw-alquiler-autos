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

export interface TipoVehiculo {
    id: number,
    nombre: string,
    descripcion: string,
    image: string
}