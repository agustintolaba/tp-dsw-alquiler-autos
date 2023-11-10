'use client';
import { useState, useEffect } from 'react';
import HomeGridItem, { HomeGridItemProps } from '@/components/HomeGridItem';
import HomeDetailItem, { HomeDetailItemProps } from '@/components/HomeDetailItem';

const homeItems = [
  {
    image: '/assets/images/cardsIcon.png',
    title: 'Recogida más rápida',
    subtitle: 'Ya tenemos tu contrato preparado',
    bgColor: 'bg-emerald-800',
  },
  {
    image: '/assets/images/carIcon.png',
    title: 'Viaje de alquiler',
    subtitle: 'Más de 20 años de experiencia',
    bgColor: 'bg-teal-950',
  },
  {
    image: '/assets/images/bagageIcon.png',
    title: 'Mejor servicio',
    subtitle: 'Te conocemos mejor, te servimos mejor',
    bgColor: 'bg-cyan-950',
  },
];



export default function Home() {
  const [homeDetailItems, setHomeDetailItems] = useState([]);

  useEffect(() => {
    const fetchHomeDetailItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tipovehiculo');
        const data = await response.json();
        const list = data.data.map((item: any) => {
        return {
          id: item.id.toString(),
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          image: item.image
        };
      });
        console.log(list);
        setHomeDetailItems(list);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchHomeDetailItems();
  }, []);

  return (
    <main className="flex flex-col p-8 gap-12">      
      <div className="flex flex-row flex-wrap gap-12 justify-center">
        {homeItems.map((item: HomeGridItemProps) => (
          <HomeGridItem
            key={item.title}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            bgColor={item.bgColor}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center items-center gap-16">
        <div className='flex flex-col max-w-6xl gap-8'>
          <span className="text-center text-4xl font-extralight">
            Los mejores alquileres de coches y furgonetas en Rosario
          </span>

          <span className="text-center text-lg italic font-extralight">
            Nuestros proveedores ofrecen vehículos de transmisión automática y
            manual en Argentina, sin embargo, la disponibilidad puede variar.
          </span>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl">
          {homeDetailItems.map((item: HomeDetailItemProps) => (
            <HomeDetailItem
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              image={item.image}          
            />
          ))}
        </div>
      </div>
    </main>
  );
}
