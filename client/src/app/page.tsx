import Image from 'next/image';
import HomeGridItem, { HomeGridItemProps } from '@/components/HomeGridItem';
import { homedir } from 'os';
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

const homeDetailItems = [
  {
    image: '/assets/images/economyCar.png',
    title: 'Economía',
    seating: '4',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '/assets/images/luxuryCar.png',
    title: 'Lujo',
    seating: '5',
    suitcases: 2,
    description:
      'Los clientes que visitan Argentina alquilan autos de lujo para negocios, vacaciones y otras ocasiones especiales de la vida, como aniversarios. Se utilizan principalmente por la comodidad y el cociente de estilo que añaden al viaje.',
  },
  {
    image: '/assets/images/convertibleCar.png',
    title: 'Convertible',
    seating: '4',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '/assets/images/allRounderCar.png',
    title: 'Todoterreno',
    seating: '4',
    suitcases: 2,
    description:
      'Los viajes por carretera, llenos de actividades como acampar y deportes acuáticos, se planifican mejor con el alquiler de SUV. La mayoría de las familias que visitan Argentina alquilan vehículos todoterreno para viajes seguros pero lujosos a lugares como Puerto Madero y parques nacionales como el Glaciar Perito Moreno.',
  },
  {
    image: '/assets/images/minivanCar.png',
    title: 'Furgoneta/Minivan',
    seating: '7/8',
    suitcases: 2,
    description:
      'El alquiler de una camioneta o una minivan le brinda espacio para las piernas y el equipaje que otras categorías de automóviles no tienen. Sobre la base de la capacidad de asientos, se clasifican como alquileres de van y minivan para 7 pasajeros, 8 pasajeros, 9 pasajeros, 10 pasajeros, 12 pasajeros y 15 pasajeros.',
  },
];

export default function Home() {
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
            Los mejores alquileres de coches y furgonetas de los mejores
            proveedores
          </span>

          <span className="text-center text-lg italic font-extralight">
            Nuestros proveedores ofrecen vehículos de transmisión automática y
            manual en Argentina, sin embargo, la disponibilidad puede variar según
            el proveedor y la ubicación donde alquile el vehículo.
          </span>
        </div>

        <div className="flex flex-col gap-12 max-w-4xl">
          {homeDetailItems.map((item: HomeDetailItemProps) => (
            <HomeDetailItem
              key={item.title}
              image={item.image}
              title={item.title}
              seating={item.seating}
              suitcases={item.suitcases}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
