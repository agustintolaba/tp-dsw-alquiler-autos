import { Typography } from "@mui/material";
import AdminHomeItem from "./items/AdminHomeItem";

const homeItems = [
  {
    icon: "car_rental",
    title: "Administrar vehículos",
    subtitle:
      "Aquí puedes listar, filtrar, agregar, editar y eliminar vehículos",
    bgColor: "bg-teal-700",
    href: "/home/vehicles",
  },
  {
    icon: "receipt_long",
    title: "Administrar reservas",
    subtitle: "Aquí puedes verificar y cambiar el estado de las reservas",
    bgColor: "bg-cyan-900",
    href: "/home/bookings",
  },
  {
    icon: "group",
    title: "Administrar usuarios",
    subtitle: "Aquí puedes eliminar y cambiar el rol de los usuarios",
    bgColor: "bg-cyan-800",
    href: "/home/users",
  },
  {
    icon: "",
    title: "Administrar Tipo-Vehículo",
    subtitle: "Aquí puedes eliminar y editar los tipos de vehículos",
    bgColor: "bg-teal-800",
    href: "/home/tipoVehiculo"
  },
];

const AdminHomePage = () => {
  return (
    <div className="flex w-full flex-col pb-12">
      <div className="flex flex-row justify-center flex-wrap gap-8 p-8">
        {homeItems.map((item, index) => (
          <AdminHomeItem
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            bgColor={item.bgColor}
            href={item.href}
          />
        ))}
      </div>
      <footer className="fixed flex items-center justify-center bottom-0 w-full py-4 px-2 bg-slate-700">
        <span className="text-sm text-center text-yellow-400 sm:text-md">
          Para mas opciones abrir el menu lateral
        </span>
      </footer>
    </div>
  );
};

export default AdminHomePage;
