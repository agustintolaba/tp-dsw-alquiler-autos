'use client';
import { useState, useEffect } from 'react';
import TipoVehiculoItem, { TipoVehiculoProps } from '@/components/TipoVehiculoItem';

const TipoVehiculoList= () => {
  const [tipoVehiculoItems, setTipoVehiculoItems] = useState([])

  useEffect(() => {
    const fetchHomeDetailItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tipovehiculo')
        const data = await response.json()
        const list = data.data.map((item: any) => {
        return {
          id: item.id.toString(),
          nombre: item.nombre,
          descripcion: item.descripcion,
          precio: item.precio,
          image: item.image
        }
      })
        setTipoVehiculoItems(list)
      } catch (error) {
        console.error('Error:', error)
      }
    };
    fetchHomeDetailItems()
  }, [])

  return (
    <main className="flex flex-col p-8 gap-12">      
      <div className="flex flex-col gap-12 max-w-4xl">
          {tipoVehiculoItems.map((item: TipoVehiculoProps) => (
            <TipoVehiculoItem
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              image={item.image}          
            />
          ))}
       </div>
    </main>
  )
}

export default TipoVehiculoList