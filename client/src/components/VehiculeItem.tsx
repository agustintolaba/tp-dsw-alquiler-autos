/*Para crear el componente de vehiculo*/
'use client';
import { Vehiculo } from '@/types';
import { transmisionDescriptions } from '@/utils/constants';
import { Button } from '@mui/material';
import Image from 'next/image';

interface VehiculeItemProps {
  isAdmin: boolean
  vehicle: Vehiculo
}

const VehiculeItem: React.FC<VehiculeItemProps> = ({ isAdmin, vehicle}) => {
  const { image, marca, modelo, capacidad, tipoVehiculo, transmision } = vehicle
  return (
    <div className="flex flex-row flex-wrap justify-center items-center gap-6 pt-8 pb-4 px-4 rounded-2xl bg-slate-500 lg:px-8">
      <Image
        src={image}
        alt={'vehiculo'}
        width={280}
        height={280}
        className="object-contain"
      />
      <div className='flex flex-col justify-end items-center gap-6 sm:items-end'>
        <div className="flex flex-col items-start gap-2 text-white">
          <span className="font-bold text-2xl tracking-wider">{marca} {modelo}</span>
          <div className="flex flex-row gap-4 text-white">
            <div className="flex flex-row gap-1 justify-center items-center">
              <span>Capacidad: {capacidad} personas</span>
            </div>
            <div className="flex flex-row gap-1 justify-center items-center">
              <span>Precio por día: $ {tipoVehiculo.precio}</span>
            </div>
          </div>
          <span className="font-light text-sm text-justify max-w-lg">{transmisionDescriptions[vehicle.transmision]}</span>
        </div>
        <Button variant='outlined' color='success'>Más información</Button>
        <Button variant='outlined' color='success'>Reservar ahora</Button>
      </div>
    </div>
  );
}

export default VehiculeItem