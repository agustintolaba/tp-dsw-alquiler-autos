'use client';
import { useState, useEffect, Fragment } from 'react';
import apiClient from '@/utils/client';
import { useRouter } from 'next/navigation';
import ClientHomePage from './ClientHomePage';
import LoadingScreen from '@/components/LoadingScreen';
import axios, { AxiosError } from 'axios';



export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = window.localStorage.getItem('token')
      apiClient.get("/tipousuario/verifyAdmin", {
        headers: {
          'Authorization': token
        }
      })
        .then((res) => {
          const isAdmin = res.data.message
          console.log(isAdmin)
          setIsAdmin(isAdmin)
          setIsLoading(false)
        })
        .catch((error: Error | AxiosError) => {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data.message)
          } else {
            console.log(error)
            if (error.message != undefined) {
              alert(error.message)
            } else {
              alert("Ha ocurrido un error")
            }
          }
          router.replace("/")
        })
    };
    verifyAdmin()
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen /> || (isAdmin && (
        <h1>Empleado</h1>
      ) || (
          <ClientHomePage />
        ))}
    </>
  );
}
