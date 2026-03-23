import { Routes, Route } from 'react-router-dom'
import Login from './paginas/Login'
import Inicio from './paginas/Inicio'
import EjercicioUno from './paginas/EjercicioUno'
import EjercicioDos from './paginas/EjercicioDos'
import RutaPrivada from './componentes/RutaPrivada'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/inicio"
        element={
          <RutaPrivada>
            <Inicio />
          </RutaPrivada>
        }
      />

      <Route
        path="/ejercicio-uno"
        element={
          <RutaPrivada>
            <EjercicioUno />
          </RutaPrivada>
        }
      />

      <Route
        path="/ejercicio-dos"
        element={
          <RutaPrivada>
            <EjercicioDos />
          </RutaPrivada>
        }
      />
    </Routes>
  )
}

export default App