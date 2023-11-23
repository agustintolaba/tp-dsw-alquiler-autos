/*Para crear el componente de la lista de Provincias*/
'use client';
import { useState, useEffect } from 'react';
import ProvinciaItem, {Provincia} from './ProvinciaItem';



const ProvinciaList = () =>{
  const [provinciaItems, setProvinciaItems] = useState<Provincia[]>([])
  
  useEffect(() => {
    const fetchProvinciaItems = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/provicia')
            const data = await response.json()
            const list = data.data
                .map((item: Provincia) => {
                    return {
                        id: item.id.toString(),
                        nombre: item.nombre
                    }
                })
              
            setProvinciaItems(list)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    fetchProvinciaItems()
}, [])

  return (
    <main className="flex flex-col p-8 gap-12">      
       <div className="flex flex-col gap-12 max-w-4xl">
          {provinciaItems.length > 0 ? (
                provinciaItems.map((item: Provincia) => (
                      <ProvinciaItem
                        key={item.id}
                        id={item.id}
                        nombre={item.nombre}        
                      />
                ))
                ) : (
                    <p>Sin provincias en el sistema actualmente!</p>
                )}
        </div> 
    </main>
  );
}

export default ProvinciaList
