'use client';
import { SelectMenuItem } from '@/types';
import { getProvinciaBranchOptions } from '@/services/provinciaBranch.js';
import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface IProvinciaSelectFieldProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProvinciaSelectField: React.FC<IProvinciaSelectFieldProps> = ({
  value,
  onChange,
}) => {
  const [provincias, setProvincias] = useState<SelectMenuItem[]>([
    { id: 1, descripcion: 'Cargando...' },
  ]);

  useEffect(() => {
    const fetchProvincias = async () => {
      getProvinciaBranchOptions()
        .then((prov) => {
          if (prov.length == 0) {
            throw Error('No se encontraron provincias');
          }
          value = prov.at(0)?.id || 1;
          setProvincias(prov);
        })
        .catch((error: any) => {
          setProvincias([
            { id: 1, descripcion: 'No se encontraron provincias' },
          ]);
        });
    };
    fetchProvincias();
  }, []);

  return (
    <TextField
      name="provincia"
      label="Provincia"
      variant="outlined"
      select
      disabled={provincias.at(0)?.descripcion == 'Cargando...'}
      InputLabelProps={{ shrink: true }}
      fullWidth
      value={value}
      onChange={onChange}
    >
      {provincias ? (
        provincias.map((p) => (
          <MenuItem key={p.id} value={p.id}>
            {p.descripcion}
          </MenuItem>
        ))
      ) : (
        <div></div>
      )}
    </TextField>
  );
};

export default ProvinciaSelectField;
