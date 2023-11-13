'use client'
import { Container, Grid, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

const options = [{
    id: 1,
    description: "Cliente"
}, {
    id: 2,
    description: "Empleado"
}]

interface UserFormData {
    nombre: string;
    apellido: string;
    email: string;
    contraseña: string;
    fechaNacimiento: string;
    numeroDocumento: string;
    numeroTelefono: string;
    tipo: number;
}

const UserRegistrationForm: React.FC = ({ }) => {
    const [formData, setFormData] = useState<UserFormData>({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        fechaNacimiento: "",
        numeroDocumento: "",
        numeroTelefono: "",
        tipo: 1
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
                    <Grid item xs={6}>
                        <TextField
                            name="nombre"
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="apellido"
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            value={formData.apellido}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="fechaNacimiento"
                            label="Fecha de nacimiento"
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            value={formData.fechaNacimiento}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="numeroDocumento"
                            label="Número de documento"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={formData.numeroDocumento}
                            onChange={handleInputChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="numeroTelefono"
                            label="Número de teléfono"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={formData.numeroTelefono}
                            onChange={handleInputChange}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        {/* <TextField
                            fullWidth
                            variant="outlined"
                            select
                            label="Tipo de usuario"
                            // defaultValue="1"
                        >
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.description}
                                </MenuItem>
                            ))}
                        </TextField> */}
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default UserRegistrationForm