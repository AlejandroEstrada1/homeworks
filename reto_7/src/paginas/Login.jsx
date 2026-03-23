import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextoAutenticacion } from '../contexto/ContextoAutenticacion'

function Login() {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')

  const { iniciarSesion } = useContext(ContextoAutenticacion)
  const navegar = useNavigate()

  const manejarIngreso = (e) => {
    e.preventDefault()

    const accesoPermitido = iniciarSesion(correo, contrasena)

    if (accesoPermitido) {
      setError('')
      navegar('/inicio')
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="contenedor">
      <div className="tarjeta">
        <h1>Inicio de sesión</h1>
        <p className="subtitulo">Ingresa para ver las páginas privadas</p>

        <form onSubmit={manejarIngreso}>
          <div className="grupo-input">
            <label>Correo</label>
            <input
              type="email"
              placeholder="Escribe tu correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="grupo-input">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Escribe tu contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <button type="submit">Ingresar</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="credenciales">
          <p><strong>Correo válido:</strong> user@mail.com</p>
          <p><strong>Contraseña válida:</strong> 123</p>
        </div>
      </div>
    </div>
  )
}

export default Login