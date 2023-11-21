import dayjs from "dayjs";

export const API_BASE_URL = 'http://localhost:3000/api/'
export const TOKEN_STORAGE_KEY = 'access-token'
export const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const PASSWORD_MIN_LENGTH = 5
export const PASSWORD_LENGTH_ERROR = `Tamaño mínimo: ${PASSWORD_MIN_LENGTH} caracteres`
export const PASSWORDS_NOT_MATCH_ERROR = "Las contraseñas no coinciden"
export const MIN_WORKING_HOUR = 9
export const MAX_WORKING_HOUR = 18
export const SIX_PM = dayjs().set('hour', MIN_WORKING_HOUR).startOf('hour');
export const NINE_AM = dayjs().set('hour', MAX_WORKING_HOUR).startOf('hour');