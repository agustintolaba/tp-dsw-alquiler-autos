'use client';
import { useState, ChangeEvent, useEffect } from "react";

interface OpcionTipo{
  id: string,
  nombre: string,
  descripcion: string,
  precio: string,
  image: string
}

interface OpcionSeguro{
  id: string,
  nombreSeguro: string,
  companiaSeguro: string
}

interface OpcionSucursal{
  id: string,
  calleSucursal: string,
  numeroSucursal:string,
  localidad: {
    id: string,
    nombreLocalidad: string
  }
}

const VehiculoNew= ()=>{
  const [nombre, setNombre] = useState("")
  const [trasmision, setTrasmision] = useState("")
  const [capacidad, setCapacidad] = useState(0)
  const [disponible, setDisponible] = useState(1)
  const [image, setImage] = useState<Blob | null>(null)
  const [tipoVehiculo, setTipoVehiculo] = useState(0)
  const [seguro, setSeguro] = useState(0)
  const [sucursal, setSucursal] = useState(0)
  const [opcionesTipoVehiculo, setOpcionesTipoVehiculo] = useState([])
  const [opcionesSeguro, setOpcionesSeguro] = useState([])
  const [opcionesSucursal, setOpcionesSucursal] = useState([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  }

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tipovehiculo')
        const data = await response.json()
        const list = data.data.map((item: OpcionTipo) => {
        return {
          id: item.id.toString(),
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          image: item.image
        }
      })
        setOpcionesTipoVehiculo(list)
      } catch (error) {
        console.error('Error:', error)
      }
    };
    fetchTipos()
  }, [])

  useEffect(() => {
    const fetchSeguros = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/seguro')
        const data = await response.json()
        const list = data.data.map((item: OpcionSeguro) => {
        return {
          id: item.id.toString(),
          nombreSeguro: item.nombreSeguro,
          companiaSeguro: item.companiaSeguro

        }
      })
        setOpcionesSeguro(list)
      } catch (error) {
        console.error('Error:', error)
      }
    };
    fetchSeguros()
  }, [])

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/sucursal')
        const data = await response.json()
        const list = data.data.map((item: OpcionSucursal) => {
        return {
          id: item.id.toString(),
          calleSucursal: item.calleSucursal,
          numeroSucursal: item.numeroSucursal,
          localidad: {
            id: item.localidad.id,
            nombreLocalidad: item.localidad.nombreLocalidad
            }
          }
      })
        setOpcionesSucursal(list)
      } catch (error) {
        console.error('Error:', error)
      }
    };
    fetchSucursales()
  }, [])
  
  const add = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("trasmision", trasmision);
    formData.append("capacidad", capacidad.toString());
    formData.append("disponible", disponible.toString());
    formData.append("image", image as Blob);
    formData.append("tipoVehiculo", tipoVehiculo.toString());
    formData.append("seguro", seguro.toString());
    formData.append("sucursal", sucursal.toString());

    try {
      const response = await fetch("http://localhost:3000/api/vehiculo", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      limpiarCampos();
      alert("Se cargo")

    } catch (error: any) {
      alert("No se cargo")
      console.error("Error:", error.message);
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setTrasmision("");
    setCapacidad(0);
    setDisponible(1);
    setImage(null);
    setTipoVehiculo(0);
    setSeguro(0);
    setSucursal(0);
  };


  return (
    <form
  onSubmit={(event) => {
    event.preventDefault();
    add();
  }}>

<div className="md:flex justify-center items-center w-full p-4 mb-4">
        <h1 className="text-white font-sans text-2xl">REGISTRO DE NUEVO VEHICULO</h1>
    </div>
  <div className="container mx-auto mt-10">
    <div className="max-w-lg mx-auto bg-green-900 rounded-lg overflow-hidden md:max-w-md text-white font-arial">
      <div className="md:flex">
        <div className="w-full p-4">
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="nombre"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
              placeholder="Ingrese un nombre"
            />
          </div>

          <div className="mb-4">
  <label
    className="block text-sm font-bold mb-2"
    htmlFor="trasmision"
  >
    Trasmision:
  </label>
  <select
    id="trasmision"
    value={trasmision}
    onChange={(event) => setTrasmision(event.target.value)}
    className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
  >
    <option value="" disabled>Seleccione la trasmision</option>
    <option value="Automatico">Automático</option>
    <option value="Semi-Automatico">Semiautomático</option>
    <option value="Manual">Manual</option>
  </select>
</div>


          <div className="mb-4">
  <label
    className="block text-sm font-bold mb-2"
    htmlFor="capacidad"
  >
    Capacidad:
  </label>
  <select
    id="capacidad"
    value={capacidad.toString()} // Convertir a string ya que el valor del estado es un número
    onChange={(event) => setCapacidad(parseInt(event.target.value, 10))}
    
    className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
  >
    <option value={0} disabled>Seleccione la capacidad</option>
    <option value={2}>2 personas</option>
    <option value={3}>3 personas</option>
    <option value={4}>4 personas</option>
    <option value={5}>5 personas</option>
    <option value={6}>6 personas</option>
    <option value={8}>8 personas</option>
    <option value={10}>10 personas</option>
    <option value={12}>12 personas</option>
  </select>
</div>



          <div className="mb-4">
      <label
        className="block text-sm font-bold mb-2"
        htmlFor="tipoVehiculo"
      >
        Tipo de vehiculo:
      </label>
      <select
        id="tipoVehiculo"
        value={tipoVehiculo.toString()}
        onChange={(event) => setTipoVehiculo(parseInt(event.target.value, 10))}
        className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
        aria-label="Tipo de vehículo"
      >
        <option value={0} disabled>Seleccione el tipo de vehículo</option>
        {opcionesTipoVehiculo.map((opcion: OpcionTipo) => (
           <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option> 
          ))}
      </select>
    </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="seguro"
            >
              Seguro:
            </label>
            <select
        id="seguro"
        value={seguro.toString()}
        onChange={(event) => setSeguro(parseInt(event.target.value,10))}
        className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
        aria-label="Seguro"
      >
        <option value={0} disabled>Seleccione el seguro</option>
        
        {opcionesSeguro.map((opcion: OpcionSeguro) => (
            <option key={opcion.id} value={opcion.id}>
            {`${opcion.nombreSeguro} - ${opcion.companiaSeguro}`}
            </option>
 
          ))}
      </select>
          </div>

           <div className="mb-4">
  <label
    className="block text-sm font-bold mb-2"
    htmlFor="sucursal"
  >
    Sucursal:
  </label>
  <select
    id="sucursal"
    value={sucursal.toString()} // Convertir a string ya que el valor del estado es un número
    onChange={(event) => setSucursal(parseInt(event.target.value, 10))}
    
    className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
  >
    <option value={0} disabled>Seleccione la sucursal</option>
    {opcionesSucursal.map((opcion: OpcionSucursal) => (
    <option key={opcion.id} value={opcion.id}>
  {`${opcion.localidad.nombreLocalidad} - ${opcion.calleSucursal} - ${opcion.numeroSucursal}`}
  </option>
 
          ))}
  </select>
</div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="image"
            >
              Imagen:
            </label>
            <input
              type="file"
              id="image"
              
    
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md bg-green-300 text-green-800 focus:outline-none focus:border-blue-500"
              placeholder="Seleccione una imagen"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-600 border-t border-green-700">
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md">
          REGISTRAR
        </button>
      </div>
    </div>
  </div>
</form>



  );
};

export default VehiculoNew