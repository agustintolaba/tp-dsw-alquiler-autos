import AdminHomeItem from "./items/AdminHomeItem";

const homeItems = [
  {
    icon: "car_rental",
    title: "Administrar vehículos",
    subtitle: "Aquí puedes listar, filtrar, agregar, editar y eliminar vehículos",
    bgColor: "bg-teal-700",
    href: "/home/vehicles"
  },
  {
    icon: "receipt_long",
    title: "Administrar reservas",
    subtitle: "Aquí puedes verificar y cambiar el estado de las reservas",
    bgColor: "bg-cyan-900",
    href: "/home/bookings"
  },
  {
    icon: "map",
    title: "Administrar provincias",
    subtitle: "Aquí puedes eliminar y editar el nombre de las provincias",
    bgColor: "bg-teal-900",
    href: "/home/provincia"
  },
  {
    icon: "group",
    title: "Administrar usuarios",
    subtitle: "Aquí puedes eliminar y cambiar el rol de los usuarios",
    bgColor: "bg-cyan-800",
    href: "/home/users"
  }
];

const AdminHomePage = () => {
  return (
    <div className="flex flex-col p-8">
      <div className="flex flex-row justify-center flex-wrap gap-8">
        {homeItems.map((item, index) => (
          <AdminHomeItem
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            bgColor={item.bgColor}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
