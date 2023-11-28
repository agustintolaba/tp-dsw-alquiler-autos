'use client'
import { getVehicleTypesOptions } from "@/services/vehicleTypes"
import { SelectMenuItem } from "@/types"
import { MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"

interface IVehicleTypesSelectFieldProps {
    value: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const VehicleTypesSelectField: React.FC<IVehicleTypesSelectFieldProps> = ({ value, onChange }) => {
    const [vehicleTypes, setVehicleTypes] = useState<SelectMenuItem[]>([{ id: 1, descripcion: "Cargando..." }])

    useEffect(() => {
        const fetchTypes = async () => {
            getVehicleTypesOptions()
                .then((types) => {
                    if (types.length == 0) {
                        throw Error("No se encontraron tipos vehiculos")
                    }
                    value = types.at(0)?.id || 1
                    setVehicleTypes(types)
                })
                .catch((error: any) => {
                    setVehicleTypes([{ id: 1, descripcion: "No se encontraron tipos vehiculos" }])
                })

        }
        fetchTypes()
    }, [])

    return (
        <TextField
            name="tipoVehiculo"
            label="Tipo de vehículo"
            variant="outlined"
            select
            disabled={vehicleTypes.at(0)?.descripcion == "Cargando..."}
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={value}
            onChange={onChange}
        >
            {vehicleTypes
                ? vehicleTypes.map(t => <MenuItem key={t.id} value={t.id}>{t.descripcion}</MenuItem>)
                : <div></div>}
        </TextField>
    )
}

export default VehicleTypesSelectField