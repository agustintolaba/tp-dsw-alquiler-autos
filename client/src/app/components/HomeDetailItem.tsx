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
  return <h2></h2>;
}
