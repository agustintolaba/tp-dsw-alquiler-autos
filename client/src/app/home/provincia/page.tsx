'use client';

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import LoadableScreen from "@/components/LoadableScreen";
import ProvinciaList from "@/components/ProvinciaList";

interface ProvinciaFormData{
  id: number,
  descripcionProvincia:string
}

const Provincia=()=>{
  //const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false)
    const [formData, setFormData] = useState<ProvinciaFormData>({
        id: -1,
        descripcionProvincia: ""
    })
    /*const [formErrors, setFormErrors] = useState<LoginFormData>({
        email: "",
        password: ""
    })*/

    const newProvincia = (data: ProvinciaFormData) => {
        /*const res = apiClient.post('http://localhost:3000/api/provincia', JSON.stringify(data)) //TIENE QUE SER EL ADMIN??
        res
            .then((response) => {
                const token = response.data.token
                window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
                router.push('/home')
            })
            .catch((error: Error | AxiosError) => {
                if (axios.isAxiosError(error)) {
                    alert(error.response?.data.message)
                } else {
                    console.log(error)
                    if (error.message) {
                        alert(error.message)
                    } else {
                        alert("Ha ocurrido un error")
                    }
                }
            })
            .finally(() => setIsLoading(false))*/
    }
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }
            /*let emailError = emailValidator(newFormData.email)
            let passwordError = passwordValidator(newFormData.password)
            setFormErrors({
                email: emailError,
                password: passwordError
            })*/
            //enableButton(newFormData, emailError, passwordError)
            return newFormData
        })
    }  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        newProvincia(formData)
      }


    return(
        <LoadableScreen isLoading={isLoading}>
          <div className="flex flex-col items-center p-8 gap-8" >
                <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
                
                    <span className='w-full text-4xl font-extralight'>Agregar una nueva provincia</span>
                    <TextField
                        className=""
                        name="name"
                        label="Nombre"
                        variant="outlined"
                        fullWidth
                        value={formData.descripcionProvincia}
                        onChange={handleInputChange}
                        //error={formErrors.email.length > 0}
                        //helperText={formErrors.email}
                    />
                    <Button
                        variant='outlined'
                        color='success'
                        disabled={!buttonEnabled}
                        type="submit"
                    >Añadir</Button>
                </form>
           </div>

          <ProvinciaList/>

        </LoadableScreen>

      )
}

export default Provincia