import { SelectMenuItem } from "@/types";
import dayjs from "dayjs";

export const TOKEN_STORAGE_KEY = 'access-token'
export const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const OLD_PATENTE_FORMAT = /[a-z]{3}[0-9]{3}$/;
export const NEW_PATENTE_FORMAT = /[a-z]{2}[0-9]{3}[a-z]{2}$/;
export const PASSWORD_MIN_LENGTH = 5
export const PASSWORD_LENGTH_ERROR = `Tamaño mínimo: ${PASSWORD_MIN_LENGTH} caracteres`
export const PASSWORDS_NOT_MATCH_ERROR = "Las contraseñas no coinciden"
export const MIN_WORKING_HOUR = 9
export const MAX_WORKING_HOUR = 17
export const SIX_PM = dayjs().set('hour', MAX_WORKING_HOUR).startOf('hour');
export const NINE_AM = dayjs().set('hour', MIN_WORKING_HOUR).startOf('hour');
export const NO_ACCESS = 'No tiene acceso a este recurso';
export const transmisions: SelectMenuItem[] = [{
    id: 1,
    descripcion: "AT"
}, {
    id: 2,
    descripcion: "MT"
}]
export const seatings: SelectMenuItem[] = [{
    id: 4,
    descripcion: '4 Personas'
}, {
    id: 5,
    descripcion: '5 Personas'
}, {
    id: 7,
    descripcion: '7 Personas'
}]
export const transmisionDescriptions: { [key: string]: string } = {
    'AT': 'Automática',
    'MT': 'Manual'
}