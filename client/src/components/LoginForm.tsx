'use client'
import { Container, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

interface LoginFormData {
    email: string;
    password: string;    
}

const LoginForm: React.FC = ({ }) => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(formData);
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-4">
                <Grid container spacing={2}>
                    <Grid item xs={48}>
                        <TextField
                            name="email"
                            label="E-mail"
                            variant="outlined"
                            fullWidth
                            value={formData.bornDate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={48}>
                        <TextField
                            name="password"
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            fullWidth
                            value={formData.bornDate}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default LoginForm