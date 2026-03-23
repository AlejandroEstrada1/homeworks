import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextoAutenticacion } from '../contexto/ContextoAutenticacion'

function Inicio() {
  const { usuario, cerrarSesion } = useContext(ContextoAutenticacion)
  const navegar = useNavigate()

  const manejarCerrarSesion = () => {
    cerrarSesion()
    navegar('/')
  }

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1>Inicio</h1>

        <p className="texto-bienvenida">
          Bienvenido, <strong>{usuario?.nombre}</strong>
        </p>

        <p className="usuario-actual">
          Usuario actual: <strong>{usuario?.correo}</strong>
        </p>

        <div className="navegacion">
          <Link to="/ejercicio-uno" className="boton-enlace">
            Ir al Ejercicio 1
          </Link>

          <Link to="/ejercicio-dos" className="boton-enlace">
            Ir al Ejercicio 2
          </Link>
        </div>

        <button className="boton-salida" onClick={manejarCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Inicio