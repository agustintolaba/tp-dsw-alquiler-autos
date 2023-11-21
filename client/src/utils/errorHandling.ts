import axios from "axios"

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        alert(error.response?.data.message)
    } else {
        if (error.message != undefined) {
            alert(error.message)
        } else {
            alert("Ha ocurrido un error")
        }
    }
}