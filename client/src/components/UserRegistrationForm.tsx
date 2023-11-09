'use client'
import { Container, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import ServerDataSelect from "./ServerDataSelect";

const options = [{
    id: 1,
    description: "Cliente"
}, {
    id: 2,
    description: "Empleado"
}]

interface UserRegistrationProps {

}

interface UserFormData {
    name: string;
    surname: string;
    bornDate: string;
    cuit: string;
    phoneNumber: string;
    type: number;
}

interface UserFormValidation {
    name: boolean;
    surname: boolean;
    bornDate: boolean;
    cuit: boolean;
    phoneNumber: boolean;
    type: boolean;
}

const UserRegistrationForm: React.FC<UserRegistrationProps> = ({ }) => {
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        surname: "",
        bornDate: "",
        cuit: "",
        phoneNumber: "",
        type: 1
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onSubmit(formData);
    };


    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-4">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name="name"
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleInputChange}
                        />

                    </Grid>
                        <Grid item xs={6}>
                        <TextField
                            name="surname"
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            value={formData.surname}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="bornDate"
                            label="Fecha de nacimiento"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formData.bornDate}
                            onChange={handleInputChange}
                        />

                    </Grid>
                        <Grid item xs={6}>
                        <TextField
                            name="cuit"
                            label="C.U.I.T."
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={formData.cuit}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="phoneNumber"
                            label="Número de teléfono"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                        />

                    </Grid>
                        <Grid item xs={6}>
                        <TextField
                            name="userType"
                            label="Tipo de usuario"
                            variant="outlined"
                            select
                            fullWidth
                            value={formData.type}
                            onChange={handleInputChange}
                        >
                            {options.map(option => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.description}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* <ServerDataSelect
                        url="http://localhost:3000/api/tipoUsuario"
                        onChange={(e) => { }}
                        value={formData.type}
                    /> */}
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default UserRegistrationForm