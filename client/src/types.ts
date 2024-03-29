import { BookingState } from "./utils/bookingState";

export interface Identifiable {
  id: number;
}

export interface Descriptible {
  descripcion: string;
}

export type SelectMenuItem = Identifiable & Descriptible;

export type TipoUsuario = Identifiable & Descriptible;

export interface Usuario extends Identifiable {
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento: string;
  numeroDocumento: string;
  phoneNumber: string;
  tipoUsuario: TipoUsuario;
}

export interface Vehiculo extends Identifiable {
  marca: string;
  modelo: string;
  patente: string;
  transmision: string;
  capacidad: number;
  year: string;
  km: number;
  image: string;
  tipoVehiculo: TipoVehiculo;
  sucursal: Sucursal;
}

export interface Reserva extends Identifiable {
  fechaRealizacion: string;
  fechaDesde: string;
  fechaHasta: string;
  fechaRealEntrega: string;
  fechaRealDevolucion: string;
  estado: BookingState;
  vehiculo: Vehiculo;
  usuario: Usuario;
}

export interface TipoVehiculo extends Identifiable {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface Sucursal extends Identifiable {
  calle: string;
  numeroCalle: string;
  localidad: Localidad;
}

export interface Localidad extends Identifiable, Descriptible {
  provincia: Provincia;
}

export interface Provincia extends Identifiable, Descriptible {
  localidades: Localidad[];
}
