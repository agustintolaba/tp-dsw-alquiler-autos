/*Para crear el componente de la lista de vehiculos*/
'use client';
import { useState, useEffect } from 'react';
import VehiculoItem, {VehiculoItemProps} from '@/components/VehiculoItem';

interface ShowVehiculosProps {
  idTipoVehiculo: string;
}

/*const list=  [
        {
            id: '1',
            nombre: "Chevrolet Cruze",
            trasmision: "Automatica",
            capacidad: '4',
            disponible: 'true',
            image: "/assets/images/chevroletCruze.png",
            tipoVehiculo: {
                id: '1',
                nombre: "Economico",
                descripcion: "Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina",
                precio: "15000.00",
                image: "/assets/images/economyCar.png"
            },
            seguro: {
                id: '1',
                nombreSeguro: "Plan Millenials ",
                companiaSeguro: "La Segunda Seguros"
            }
        },
        {
            id: '2',
            nombre: "Chevrolet Corsa",
            trasmision: "Manual",
            capacidad: '4',
            disponible: 'true',
            image: "/assets/images/chevroletCorsa.png",
            tipoVehiculo: {
                id: '1',
                nombre: "Economico",
                descripcion: "Bastante populares entre los viajeros de bajo presupuesto que visitan Argentina",
                precio: "15000.00",
                image: "/assets/images/economyCar.png"
            },
            seguro: {
                id: '1',
                nombreSeguro: "Plan Millenials ",
                companiaSeguro: "La Segunda Seguros"
            }
        }
    ]*/

const VehiculoList: React.FC<ShowVehiculosProps> = ({ idTipoVehiculo }) =>{
  const [vehiculoItems, setVehiculoItems] = useState([]);

  /*useEffect(() => {
    const fetchVehiculoItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/vehiculo'); 
        const data = await response.json();
        const list = data.data
        .filter((item: any) => item.tipoVehiculo.id === idTipoVehiculo && item.disponible === true)
        .map((item: any) => {
        return {
          id: item.id.toString(),
          nombre: item.nombre,
          trasmision: item.trasmision,
          capacidad: item.capacidad,
          disponible: item.disponible,
          image: item.image,
          tipoVehiculo: item.tipoVehiculo,
          seguro: item.seguro
          };
      });
        console.log(list);
        setVehiculoItems(list);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchVehiculoItems();
  }, [idTipoVehiculo]);*/

  useEffect(() => {
    const fetchVehiculoItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/vehiculo');
            const data = await response.json();
            const list = data.data
                .filter((item: any) => item.tipoVehiculo.id == idTipoVehiculo && item.disponible == true)
                .map((item: any) => {
                    return {
                        id: item.id.toString(),
                        nombre: item.nombre,
                        trasmision: item.trasmision,
                        capacidad: item.capacidad.toString(),
                        disponible: item.disponible.toString(),
                        image: item.image,
                        tipoVehiculo: {
                            id: item.tipoVehiculo.id.toString(),
                            nombre: item.tipoVehiculo.nombre,
                            descripcion: item.tipoVehiculo.descripcion,
                            precio: item.tipoVehiculo.precio,
                            image: item.tipoVehiculo.image
                        },
                        seguro: {
                            id: item.seguro.id.toString(),
                            nombreSeguro: item.seguro.nombreSeguro,
                            companiaSeguro: item.seguro.companiaSeguro
                        }
                    };
                });
            console.log(list);
            setVehiculoItems(list);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    fetchVehiculoItems();
}, [idTipoVehiculo]);

  return (
    <main className="flex flex-col p-8 gap-12">      
      
         {/*<div className="flex flex-col gap-12 max-w-4xl">
          {vehiculoItems.map((item: VehiculoItemProps) => (
            <VehiculoItem
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              trasmision={item.trasmision}
              capacidad={item.capacidad}
              disponible={item.disponible}
              image={item.image} 
              tipoVehiculo={item.tipoVehiculo}
              seguro={item.seguro}         
            />
          ))}
          </div>*/}

        <div className="flex flex-col gap-12 max-w-4xl">
          {vehiculoItems.length > 0 ? (
                vehiculoItems.map((item: VehiculoItemProps) => (
                      <VehiculoItem
                        key={item.id}
                        id={item.id}
                        nombre={item.nombre}
                        trasmision={item.trasmision}
                        capacidad={item.capacidad}
                        disponible={item.disponible}
                        image={item.image} 
                        tipoVehiculo={item.tipoVehiculo}
                        seguro={item.seguro}         
                      />
                ))
                ) : (
                    <p>No hay vehículos disponibles</p>
                )}
</div>
      
    </main>
  );
}

export default VehiculoList;
