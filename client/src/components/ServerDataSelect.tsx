'use client'
import { Descriptible, Identifiable } from "@/types"
import { MenuItem, TextField } from "@mui/material"
import { useEffect, useState } from "react"

const fetchData = (url: string) => {
    const data = fetch(url, { mode: 'no-cors'})
        .then(res => {
            console.log(res.json())
            return res.json()
        })
    return data
}
interface ServerDataSelectProps {
    url: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: number
}

const ServerDataSelect = <T extends Identifiable & Descriptible>({ onChange, url, value }: ServerDataSelectProps) => {
    const [options, setOptions] = useState<T[]>([])

    useEffect(() => {
        fetchData(url).then((data) => {
            setOptions(data);
            console.log(data)
        });
    }, []);

    return (
        <TextField
            name="userType"
            label="Tipo de usuario"
            variant="outlined"            
            select
            fullWidth
            value={value}
            onChange={onChange}
        >
            {options.map(option => (
                <MenuItem key={option.id} value={option.id}>
                    {option.description}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default ServerDataSelect