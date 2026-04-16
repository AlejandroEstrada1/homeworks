/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const UsuarioContexto = createContext(null)
const llaveUsuario = 'parcial2_usuario_mock'

export function ProveedorUsuario({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem(llaveUsuario)

    if (!guardado) {
      return null
    }

    try {
      return JSON.parse(guardado)
    } catch {
      localStorage.removeItem(llaveUsuario)
      return null
    }
  })

  const iniciarSesion = (correo) => {
    const correoLimpio = correo.trim().toLowerCase()

    if (!correoLimpio) {
      return {
        ok: false,
        mensaje: 'escriba un correo aunque sea',
      }
    }

    const nuevoUsuario = {
      correo: correoLimpio,
    }

    setUsuario(nuevoUsuario)
    localStorage.setItem(llaveUsuario, JSON.stringify(nuevoUsuario))

    return {
      ok: true,
      mensaje: 'listo, quedo la sesion abierta',
    }
  }

  const cerrarSesion = () => {
    setUsuario(null)
    localStorage.removeItem(llaveUsuario)
  }

  return (
    <UsuarioContexto.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContexto.Provider>
  )
}

export function useUsuario() {
  const contexto = useContext(UsuarioContexto)

  if (!contexto) {
    throw new Error('useUsuario se usa dentro de ProveedorUsuario')
  }

  return contexto
}
