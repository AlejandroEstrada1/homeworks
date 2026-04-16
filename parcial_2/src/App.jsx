import { useEffect, useState } from 'react'
import './App.css'
import {
  arreglarArbol,
  buscarNodo,
  meterNodo,
  sacarId,
  sacarRuta,
} from './arbol'
import { useUsuario } from './contexto/UsuarioContexto'
import {
  cargarDatosDelParcial,
  datosIniciales,
  guardarDatosDelParcial,
} from './servicios/baseDeDatos'

function Nodo({ nodo, seleccionado, setSeleccionado, nivel = 0 }) {
  const esArchivo = nodo.tipo === 'archivo'

  return (
    <div className="item-arbol" style={{ marginLeft: `${nivel * 12}px` }}>
      <button
        type="button"
        className={seleccionado == nodo.id ? 'nodo activo' : 'nodo'}
        onClick={() => setSeleccionado(nodo.id)}
      >
        <div className="tipo">{nodo.tipo}</div>
        <div className="nombre">{nodo.nombre}</div>
        <div className="correo">{nodo.creadoPor}</div>
      </button>

      {!esArchivo &&
        nodo.hijos.map((hijo) => (
          <Nodo
            key={hijo.id}
            nodo={hijo}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
            nivel={nivel + 1}
          />
        ))}
    </div>
  )
}

function App() {
  const { usuario, iniciarSesion, cerrarSesion } = useUsuario()
  const [datos, setDatos] = useState(datosIniciales)
  const [correo, setCorreo] = useState('')
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('carpeta')
  const [seleccionado, setSeleccionado] = useState('raiz')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(true)
  const [yaCargo, setYaCargo] = useState(false)

  useEffect(() => {
    let vivo = true

    async function cargar() {
      const respuesta = await cargarDatosDelParcial()

      if (!vivo) {
        return
      }

      setDatos(respuesta.datos)
      setCargando(false)
      setYaCargo(true)

      if (!buscarNodo(respuesta.datos.arbol, seleccionado)) {
        setSeleccionado('raiz')
      }
    }

    cargar()

    return () => {
      vivo = false
    }
  }, [])

  useEffect(() => {
    if (!yaCargo) {
      return
    }

    guardarDatosDelParcial(datos)
  }, [datos, yaCargo])

  const puede =
    Boolean(usuario?.correo) && datos.usuariosRegistrados.includes(usuario.correo)

  const actual = buscarNodo(datos.arbol, seleccionado) || datos.arbol
  const ruta = sacarRuta(datos.arbol, actual.id)

  const entrar = (e) => {
    e.preventDefault()
    const respuesta = iniciarSesion(correo)
    setMensaje(respuesta.mensaje)

    if (respuesta.ok) {
      setCorreo('')
    }
  }

  const registrar = () => {
    const correoLimpio = correo.trim().toLowerCase()

    if (!correoLimpio) {
      setMensaje('escriba un correo')
      return
    }

    if (datos.usuariosRegistrados.includes(correoLimpio)) {
      setMensaje('ese correo ya esta')
      return
    }

    setDatos((anterior) => ({
      ...anterior,
      usuariosRegistrados: [...anterior.usuariosRegistrados, correoLimpio],
    }))

    iniciarSesion(correoLimpio)
    setCorreo('')
    setMensaje('usuario registrado')
  }

  const crear = (e) => {
    e.preventDefault()

    if (!usuario) {
      setMensaje('inicie sesion')
      return
    }

    if (!puede) {
      setMensaje('usuario no registrado')
      return
    }

    if (!nombre.trim()) {
      setMensaje('falta nombre')
      return
    }

    if (actual.tipo === 'archivo') {
      setMensaje('un archivo no puede tener hijos')
      return
    }

    const nuevo = arreglarArbol({
      id: sacarId(),
      nombre: nombre.trim(),
      tipo,
      creadoPor: usuario.correo,
      fecha: new Date().toISOString(),
      hijos: [],
    })

    const intento = meterNodo(datos.arbol, actual.id, nuevo)

    if (!intento.pudo) {
      setMensaje('no se pudo crear')
      return
    }

    setDatos((anterior) => ({
      ...anterior,
      arbol: intento.arbol,
    }))
    setNombre('')
    setMensaje('creado')
  }

  if (cargando) {
    return <main className="pantalla">cargando...</main>
  }

  return (
    <main className="pantalla">
      <h1>Sistema de carpetas y archivos</h1>

      <div className="principal">
        <div className="lado">
          <div className="caja">
            <h2>Login</h2>
            <form onSubmit={entrar} className="formulario">
              <label>
                Correo
                <input
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="correo@uao.edu.co"
                />
              </label>

              <div className="botones">
                <button type="submit">Entrar</button>
                <button type="button" className="gris" onClick={registrar}>
                  Registrar
                </button>
              </div>
            </form>

            <div className="info">
              <p>Sesion: {usuario ? usuario.correo : 'sin sesion'}</p>
              <p>Puede crear: {puede ? 'si' : 'no'}</p>
              <button type="button" className="gris ancho" onClick={cerrarSesion}>
                Cerrar sesion
              </button>
            </div>
          </div>

          <div className="caja">
            <h2>Crear</h2>
            <form onSubmit={crear} className="formulario">
              <label>
                Nombre
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="archivo.txt"
                />
              </label>

              <label>
                Tipo
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="carpeta">carpeta</option>
                  <option value="archivo">archivo</option>
                </select>
              </label>

              <p>Destino: {ruta.join(' / ')}</p>
              <button type="submit">Crear</button>
            </form>
          </div>

          <div className="caja">
            <p>Estado: {mensaje || 'sin cambios'}</p>
          </div>
        </div>

        <div className="caja arbol">
          <div className="arriba">
            <h2>Arbol</h2>
            <button type="button" className="gris" onClick={() => setSeleccionado('raiz')}>
              Raiz
            </button>
          </div>

          <div className="ruta">Seleccionado: {ruta.join(' / ')}</div>

          <div className="lista">
            <Nodo
              nodo={datos.arbol}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
