import Link from "next/link";
import DynamicIcon from "../DynamicIcon";

interface AdminHomeItemProps {
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  href: string;
}

const AdminHomeItem: React.FC<AdminHomeItemProps> = ({
  title,
  subtitle,
  icon,
  bgColor,
  href
}) => {
  return (
    <Link href={href}>
      <div className={`sm:w-96 w-72 h-48 flex flex-col px-4 items-center justify-center gap-4 ${bgColor} rounded-md cursor-pointer transition-transform hover:scale-105`}>
        <DynamicIcon name={icon}/>
        <span className="font-bold text-2xl text-center">{title}</span>
        <span className="font-light text-md text-center italic">{subtitle}</span>
      </div>
    </Link>
  );
};

export default AdminHomeItem;
