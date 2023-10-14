import Image from 'next/image'
import HomeGridItem, { HomeGridItemType } from './components/HomeGridItem'

const homeItems = [{
  image: "/assets/images/cardsIcon.png",
  title: "Recogida más rápida",
  subtitle: "Ya tenemos tu contrato preparado",
  bgColor: "bg-emerald-800"
}, {
  image: "/assets/images/carIcon.png",
  title: "Viaje de alquiler",
  subtitle: "Más de 20 años de experiencia",
  bgColor: "bg-teal-950"
}, {
  image: "/assets/images/bagageIcon.png",
  title: "Mejor servicio",
  subtitle: "Te conocemos mejor, te servimos mejor",
  bgColor: "bg-cyan-950"
}]

export default function Home() {
  return (
    <main className='p-8'>
      <h1 className='text-4xl font-extralight pb-8'>Rueda libre</h1>
        <div className='flex flex-row flex-wrap gap-12 justify-center'>
          {homeItems.map((item: HomeGridItemType) => (
          <HomeGridItem
            key={item.title}
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            bgColor={item.bgColor}
          />
        ) )}
      </div>
    </main>
  )
}
