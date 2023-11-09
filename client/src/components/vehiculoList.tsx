/*Para crear el componente de la lista de vehiculos*/
import VehiculoItem, {VehiculoItemProps} from "./vehiculoItem.jsx";


export function VehiculosList() {
  const vehiculosItems = await fetch('http://localhost:3000/api/vehiculo')
  return (
    <main className="flex flex-col p-8 gap-12">      
      <div className="flex flex-col justify-center items-center gap-16">
        <div className="flex flex-col gap-12 max-w-4xl">
          {
          vehiculosItems.map((item: VehiculoItemProps) => (
            <VehiculoItem
              key={item.id}
              nombre={item.nombre}
              trasmision={item.trasmision}
              capacidad={item.capacidad}
              urlImage={item.urlImage}
              tipoVehiculo= {item.tipoVehiculo.descripcionTipoVehiculo}
              seguro={item.seguro.descripcionSeguro}
            />
          ))}
        </div>
      </div>
    </main>
  );
}