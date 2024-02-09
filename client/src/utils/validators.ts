import { TimePickerProps } from '@mui/x-date-pickers';
import {
  EMAIL_FORMAT,
  MAX_WORKING_HOUR,
  MIN_WORKING_HOUR,
  NEW_PATENTE_FORMAT,
  OLD_PATENTE_FORMAT,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORDS_NOT_MATCH_ERROR,
} from './constants';
import { Dayjs } from 'dayjs';

export const emailValidator = (email: string) => {
  if (email.length == 0) {
    return '';
  }

  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return 'Formato de email incorrecto';
  }

  return '';
};

export const patenteValidator = (patente: string) => {
  if (patente.length == 0) {
    return '';
  }

  if (!OLD_PATENTE_FORMAT.test(patente) && !NEW_PATENTE_FORMAT.test(patente)) {
    return 'Formato inválido';
  }

  return '';
};

export const passwordValidator = (password: string) => {
  if (password.length > 0 && password.length < PASSWORD_MIN_LENGTH) {
    return PASSWORD_LENGTH_ERROR;
  }

  return '';
};

export const repeatPasswordValidator = (
  password: string,
  confirmPassword: string
) => {
  if (confirmPassword.length == 0) {
    return '';
  }

  if (confirmPassword.length < PASSWORD_MIN_LENGTH) {
    return PASSWORD_LENGTH_ERROR;
  }

  if (password !== confirmPassword) {
    return PASSWORDS_NOT_MATCH_ERROR;
  }

  return '';
};

export const getDateError = (error: string | null | undefined): string => {
  if (!error || error == null) {
    return '';
  }
  switch (error) {
    case 'disablePast':
      return 'La fecha debe ser mayor a la de hoy';
    case 'disableFuture':
      return 'La fecha debe ser menor a la de hoy';
    case 'minTime':
    case 'maxTime':
      return 'Diferencia mínima: 24 horas';
    default:
      return 'Seleccione una fecha válida';
  }
};

export const disableNotWorkingTime: TimePickerProps<Dayjs>['shouldDisableTime'] =
  (value, view) =>
    (view === 'hours' &&
      !(
        value.hour() >= MIN_WORKING_HOUR && value.hour() <= MAX_WORKING_HOUR
      )) ||
    (view === 'minutes' && value.hour() == 18 && value.minute() == 30);
