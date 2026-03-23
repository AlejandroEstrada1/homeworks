import { createContext, useState } from 'react'

export const ContextoAutenticacion = createContext()

export function ProveedorAutenticacion({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  const iniciarSesion = (correo, contrasena) => {
    if (correo === 'user@mail.com' && contrasena === '123') {
      const datosUsuario = {
        nombre: 'user',
        correo: 'user@mail.com',
      }

      setUsuario(datosUsuario)
      localStorage.setItem('usuario', JSON.stringify(datosUsuario))
      return true
    }

    return false
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  )
}