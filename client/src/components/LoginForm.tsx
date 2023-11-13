'use client'
import apiClient from "@/utils/client";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export interface LoginFormData {
    email: string;
    password: string;
}

const LoginForm: React.FC = ({ }) => {
    // const router = useRouter()
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value }
            let emailError = emailValidator(newFormData.email)
            let passwordError = passwordValidator(newFormData.password)
            setFormErrors({
                email: emailError,
                password: passwordError
            })
            enableButton(newFormData, emailError, passwordError)
            return newFormData
        });
    };

    const enableButton = (newFormData: LoginFormData, emailError: string, passwordError: string) => {
        const enabled = newFormData.email.length > 0 && newFormData.password.length > 0 && emailError.length == 0 && passwordError.length == 0
        setButtonEnabled(enabled)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchLogin(formData)
    };

    const fetchLogin = (data: LoginFormData) => {
        const res = apiClient.post("usuario/login", JSON.stringify(data))
        res
            .then((response) => {
                console.log(response.data.data)
            })
            .catch((axiosError) => {
                console.log(axiosError.response.data.message)
            })
    }


    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-96 space-y-4">
            <TextField
                className=""
                name="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email.length > 0}
                helperText={formErrors.email}
            />
            <TextField
                name="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                error={formErrors.password.length > 0}
                helperText={formErrors.password}
            />
            <Button
                variant='outlined'
                color='success'
                disabled={!buttonEnabled}
                type="submit"
            >Login</Button>
        </form>
    )
}

export default LoginForm