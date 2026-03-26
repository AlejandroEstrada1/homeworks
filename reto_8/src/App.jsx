import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './paginas/Login'
import Register from './paginas/Register'
import Tareas from './paginas/Tareas'
import { useAuth } from './contextos/ContextoAuth'

function RutaPrivada({ children }) {
  const { usuario } = useAuth()
  return usuario ? children : <Navigate to="/" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/tareas"
        element={
          <RutaPrivada>
            <Tareas />
          </RutaPrivada>
        }
      />
    </Routes>
  )
}

export default App
