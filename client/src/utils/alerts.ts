import axios, { AxiosError, isAxiosError } from "axios"
import Swal from 'sweetalert2';

export const alertError = (error: Error | AxiosError) => {
    let message = isAxiosError(error) ? error.response?.data.message : error.message

        Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: message ?? 'Contacta al administrador' ,
          });
    }

