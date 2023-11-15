'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/utils/client';
import { useRouter } from 'next/navigation';
import ClientHomePage from './ClientHomePage';



export default function Home() {
  const router = useRouter()
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
        })
        .catch((error: any) => {
          alert(error.response.data.message)
          router.replace("/")
        })
    };
    verifyAdmin()
  }, []);

  return (
    <>
      {isAdmin && (
        <h1>Empleado</h1>
      ) || (
          <ClientHomePage />
        )}
    </>
  );
}
