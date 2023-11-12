'use client'
import { API_BASE_URL } from "@/utils/constants";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export interface LoginFormData {
    email: string;
    password: string;
}

function fetchLogin(data: LoginFormData) {
    return axios.post(
        `${API_BASE_URL}/login`,
        data,
    )
}

const LoginForm: React.FC = ({ }) => {
    // const router = useRouter()
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        switch (name) {
            case "email":
                setEmailError(emailValidator(value))
            case "password":
                setPasswordError(passwordValidator(value))
            default:
                break
        }        
        enableButton()
    };

    const enableButton = () => {

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('submit')
    };


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
                error={emailError.length > 0}
                helperText={emailError}
            />
            <TextField
                name="password"
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                value={formData.password}
                onChange={handleInputChange}
                error={passwordError.length > 0}
                helperText={passwordError}
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