import axios from "axios"
import Swal from "sweetalert2";

export const alertError = (error: any) => {
    if (axios.isAxiosError(error) && error.response?.data.message != undefined) {
        alert(error.response?.data.message)
    } else {
        if (error.message != undefined) {
            alert(error.message)
        } else {
            alert("Ha ocurrido un error")
        }
    }
}