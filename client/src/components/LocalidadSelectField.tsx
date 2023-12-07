'use client';
import { SelectMenuItem } from '@/types';
import { getLocalidadBranchOptions } from '@/services/localidadBranch';
import { MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

interface ILocalidadSelectFieldProps {
  filterProv: number;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const LocalidadSelectField: React.FC<ILocalidadSelectFieldProps> = ({
  filterProv,
  value,
  onChange,
  disabled,
}) => {
  const [localidades, setLocalidades] = useState<SelectMenuItem[]>([
    { id: 1, descripcion: 'Cargando...' },
  ]);
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocalidades = async () => {
      //setLoading(true);
      getLocalidadBranchOptions(filterProv)
        .then((loc) => {
          if (loc.length == 0) {
            throw Error('No se encontraron localidades');
          }
          value = loc.at(0)?.id || 1;
          setLocalidades(loc);
        })
        .catch((error: any) => {
          setLocalidades([
            { id: 1, descripcion: 'No se encontraron localidades' },
          ]);
        });
      //setLoading(false);
    };
    fetchLocalidades();
  }, [filterProv]);

  return (
    <TextField
      name="localidad"
      label="Localidad"
      variant="outlined"
      select
      disabled={localidades.at(0)?.descripcion == 'Cargando...'}
      InputLabelProps={{ shrink: true }}
      fullWidth
      value={value}
      onChange={onChange}
    >
      {localidades ? (
        localidades.map((l) => (
          <MenuItem key={l.id} value={l.id}>
            {l.descripcion}
          </MenuItem>
        ))
      ) : (
        <div></div>
      )}
    </TextField>
  );
};

export default LocalidadSelectField;
