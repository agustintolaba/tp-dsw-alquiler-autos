import Image from "next/image"

export interface HomeGridItemProps {
  image: string,
  title: string,
  subtitle: string,
  bgColor: string
}

const HomeGridItem: React.FC<HomeGridItemProps> = ({ image, title, subtitle, bgColor }) => {
  return (
    <div className={"rounded-xl flex flex-col w-72 aspect-square justify-between items-center py-8 px-4 text-white text-center " + bgColor}>
      <Image 
        src={image}
        alt={"gridIcon " + image}
        width={64}
        height={64}
      />
      <span className="font-bold text-2xl">{title}</span>
      <span className="font-light text-lg italic">{subtitle}</span>
    </div>
  )
}

export default HomeGridItem