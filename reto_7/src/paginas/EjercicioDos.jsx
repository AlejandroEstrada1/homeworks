import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContextoAutenticacion } from '../contexto/ContextoAutenticacion'

function EjercicioDos() {
  const { usuario, cerrarSesion } = useContext(ContextoAutenticacion)
  const navegar = useNavigate()

  const manejarCerrarSesion = () => {
    cerrarSesion()
    navegar('/')
  }

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1>Ejercicio 2</h1>

        <p className="texto-pagina">Esta es la segunda página privada.</p>
        <p className="usuario-actual">
          Usuario logueado: <strong>{usuario?.correo}</strong>
        </p>

        <div className="navegacion">
          <Link to="/inicio" className="boton-enlace">
            Volver a Inicio
          </Link>

          <Link to="/ejercicio-uno" className="boton-enlace">
            Ir al Ejercicio 1
          </Link>
        </div>

        <button className="boton-salida" onClick={manejarCerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default EjercicioDos