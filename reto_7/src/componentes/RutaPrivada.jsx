import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ContextoAutenticacion } from '../contexto/ContextoAutenticacion'

function RutaPrivada({ children }) {
  const { usuario } = useContext(ContextoAutenticacion)

  return usuario ? children : <Navigate to="/" />
}

export default RutaPrivada