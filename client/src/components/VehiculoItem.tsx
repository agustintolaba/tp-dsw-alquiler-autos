/*Para crear el componente de vehiculo*/
'use client';
import { Button } from '@mui/material';
import Image from 'next/image';

export interface VehiculoItemProps {
  id: string;
  nombre: string;
  transmision: string;
  capacidad: string;
  disponible: string;
  image: string;
  tipoVehiculo: {
                id: string;
                nombre: string;
                descripcion: string;
                precio: string;
                image: string;
            };
  seguro: {
                id: string;
                nombre: string;
                compania: string;
            };
}

const VehiculoItem: React.FC<VehiculoItemProps> = ({ id, nombre, transmision, capacidad,disponible, image, tipoVehiculo, seguro}) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-warmGray-300 lg:px-8">
      <Image
        src={image}
        alt={'vehiculo'}
        width={280}
        height={280}
        className="object-contain"
      />
      <div className='flex flex-col justify-end items-center gap-6 sm:items-end'>
          <div className="flex flex-col items-start gap-2 text-white">
              <span className="font-bold text-2xl tracking-wider">{nombre}</span>
              <div className="flex flex-row gap-4 text-white">
                <div className="flex flex-row gap-1 justify-center items-center">
                  <span>Capacidad: {capacidad}</span>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center">
                  <span>Precio por día: $ {tipoVehiculo.precio}</span>
                </div>
              </div>
              {/*<span className="font-light text-sm text-justify max-w-lg">{description}</span>*/}
          </div>
        <Button variant='outlined' color='success'>Más información</Button>
        <Button variant='outlined' color='success'>Reservar ahora</Button>
      </div>
    </div>
  );
}

export default VehiculoItem