import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contextos/ContextoAuth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { register } = useAuth()
  const navigate = useNavigate()

  const manejarRegistro = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await register(email, password)
      navigate('/tareas')
    } catch (err) {
      setError('No se pudo registrar el usuario')
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Registro</h2>

            <form onSubmit={manejarRegistro}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Crea tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button type="submit" className="btn btn-success w-100">
                Registrarse
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register