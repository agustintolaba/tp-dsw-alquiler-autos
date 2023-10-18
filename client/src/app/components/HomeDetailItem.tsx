import Image from 'next/image';

export interface HomeDetailItemType {
  image: string;
  title: string;
  seating: string;
  suitcases: number;
  description: string;
}

export default function HomeDetailItem({
  image,
  title,
  seating,
  suitcases,
  description,
}: HomeDetailItemType) {
  return (
    <div className="flex flex-row flex-wrap justify-center items-end gap-6 py-8 px-4 rounded-2xl bg-slate-900 lg:px-8">
      <Image
        src={image}
        alt={image}
        width={280}
        height={280}
        className="object-contain"
      />
      <div className="flex flex-col items-start gap-2 text-white">
        <span className="text-bold text-2xl">{title}</span>
        <div className="flex flex-row gap-4 text-white">
          <div className="flex flex-row gap-1 justify-center items-center">
            <Image
              src="/assets/images/seatingIcon.png"
              alt="seating-icon"
              width={16}
              height={8}
              className="object-contain invert"
            />
            <span>Asientos: {seating}</span>
          </div>
          <div className="flex flex-row gap-1 justify-center items-center">
            <Image
              src="/assets/images/bagageIcon.png"
              alt="seating-icon"
              width={16}
              height={8}
              className="object-contain invert"
            />
            <span>Maletas: {suitcases}</span>
          </div>
        </div>
        <span className="text-light text-sm text-justify max-w-lg">{description}</span>
      </div>
    </div>
  );
}
