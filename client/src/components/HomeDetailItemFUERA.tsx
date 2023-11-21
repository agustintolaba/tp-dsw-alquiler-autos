'use client';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import VehiculoList from '@/components//VehiculoList';

export interface HomeDetailItemProps {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  image: string;
}


const HomeDetailItem: React.FC<HomeDetailItemProps> = ({ id, nombre, descripcion, precio, image }) => {
  const [showVehiculos, setShowVehiculos] = useState(false);

  const handleVerVehiculosClick = () => {
    setShowVehiculos(!showVehiculos);
  };

  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-slate-900 lg:px-8">
      <Image
        src={image}
        alt={image}
        width={280}
        height={280}
        className="object-contain"
      />
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='flex flex-col justify-end items-center gap-6 sm:items-end'>
          <div className="flex flex-col items-start gap-2 text-white">
            <span className="font-bold text-2xl tracking-wider">{nombre}</span>
            <div className="flex flex-row gap-4 text-white">
              <div className="flex flex-row gap-1 justify-center items-center">
                <span>Precio por dia: $ {precio}</span>
              </div>
            </div>
            <span className="font-light text-sm text-justify max-w-lg">{descripcion}</span>
          </div>
          <Button
            variant='outlined'
            color='success'
            onClick={handleVerVehiculosClick}
          >
            {!showVehiculos ? 'Ver vehiculos disponibles' : 'Ver menos'}</Button>
        </div>
        {showVehiculos && <VehiculoList idTipoVehiculo={id} />}
      </div>
    </div>
  );
}

export default HomeDetailItem;
