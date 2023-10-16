import Image from 'next/image';
import HomeGridItem, { HomeGridItemType } from './components/HomeGridItem';
import { homedir } from 'os';
import HomeDetailItem, {
  HomeDetailItemType,
} from './components/HomeDetailItem';

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
    image: '',
    title: 'Economía',
    seating: '4',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '',
    title: 'Lujo',
    seating: '5',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '',
    title: 'Convertible',
    seating: '4',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '',
    title: 'Todoterreno',
    seating: '4',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
  {
    image: '',
    title: 'Furgoneta/Minivan',
    seating: '7/8',
    suitcases: 2,
    description:
      'Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina (generalmente para planes de viaje a corto plazo), los automóviles económicos entran en la categoría de soluciones de alquiler de bajo costo. Estos vehículos de alquiler no solo son económicos, sino que también ahorran combustible.',
  },
];

export default function Home() {
  return (
    <main className="flex flex-col p-8 gap-8">
      <h1 className="text-4xl font-extralight">Rueda libre</h1>
      <div className="flex flex-row flex-wrap gap-12 justify-center">
        {homeItems.map((item: HomeGridItemType) => (
          <HomeGridItem
            key={item.title}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            bgColor={item.bgColor}
          />
        ))}
      </div>
      <div className="flex flex-col justify-start items-start gap-8">
        <span className="text-center text-4xl font-extralight">
          Los mejores alquileres de coches y furgonetas de los mejores
          proveedores
        </span>

        <span className="text-center text-lg italic font-extralight">
          Nuestros proveedores ofrecen vehículos de transmisión automática y
          manual en los EE. UU., sin embargo, la disponibilidad puede variar
          según el proveedor y la ubicación donde alquile el vehículo.
        </span>

        {homeDetailItems.map((item: HomeDetailItemType) => (
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
    </main>
  );
}
