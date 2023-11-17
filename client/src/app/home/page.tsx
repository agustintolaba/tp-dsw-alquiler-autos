'use client';
import { useState, useEffect, Fragment } from 'react';
import apiClient from '@/services/api';
import { useRouter } from 'next/navigation';
import ClientHomePage from './ClientHomePage';
import LoadingScreen from '@/components/LoadingScreen';
import axios, { AxiosError } from 'axios';
import { TOKEN_STORAGE_KEY } from '@/utils/constants';
import { verifyAdmin } from '@/services/user';
import { handleError } from '@/utils/errorHandling';



export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const isAdmin = await verifyAdmin()
        setIsAdmin(isAdmin)
        setIsLoading(false)
      } catch (error: any) {
        handleError(error)
        router.replace("/")
      }
    }
    fetchData()
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
