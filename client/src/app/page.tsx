import UserRegistrationForm from '@/components/UserRegistrationForm'
import './globals.css'
import { Container } from '@mui/material'

export default function Applitaction() {
  return (
    <div>     
      <h1 className='text-4xl fon-bold'>Bienvenido!</h1>
      <UserRegistrationForm />      
    </div>
  )
}