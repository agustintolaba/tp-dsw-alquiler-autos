/*Para crear el componente de la lista de Provincias*/
"use client";
import { useState, useEffect } from "react";
import ProvinciaItem, { Provincia } from "../items/ProvinciaItem";
import apiClient from "@/services/api";

interface ProvinciaListProps {
  isAdmin: boolean;
  onProvinciaListChanged: () => void;
}

const ProvinciaList: React.FC<ProvinciaListProps> = ({
  isAdmin,
  onProvinciaListChanged,
}) => {
  const [provinciaItems, setProvinciaItems] = useState<Provincia[]>([]);

  useEffect(() => {
    const fetchProvinciaItems = async () => {
      try {
        const response = apiClient()
          .get("/provincia")
          .then((res) => {
            const list = res.data.data.map((item: Provincia) => {
              return {
                id: item.id.toString(),
                descripcion: item.descripcion,
              };
            });
            setProvinciaItems(list);
          });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProvinciaItems();
  }, [onProvinciaListChanged]);

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 gap-4 sm:gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {provinciaItems.length > 0 ? (
          provinciaItems.map((item: Provincia) => (
            <ProvinciaItem
              isAdmin={isAdmin}
              onProvinciaListChanged={onProvinciaListChanged}
              key={item.id}
              id={item.id}
              descripcion={item.descripcion}
            />
          ))
        ) : (
          <span>Sin provincias actualmente en el sistema.</span>
        )}
      </div>
    </div>
  );
};

export default ProvinciaList;
