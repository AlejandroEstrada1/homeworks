import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProveedorAuth } from './contextos/ContextoAuth.jsx'
import { ProveedorTareas } from './contextos/ContextoTareas.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './styles.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProveedorAuth>
        <ProveedorTareas>
          <App />
        </ProveedorTareas>
      </ProveedorAuth>
    </BrowserRouter>
  </React.StrictMode>
)