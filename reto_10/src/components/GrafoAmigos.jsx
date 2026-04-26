import { useMemo, useState } from 'react'
import { Graph } from 'react-d3-graph'
import {
  ciudades,
  conexionesCiudades,
  datosGrafo,
  obtenerCiudadPorId,
  obtenerPersonasPorCiudad,
  personas,
} from '../data/datosGrafo'

const configuracionGrafo = {
  directed: true,
  nodeHighlightBehavior: true,
  staticGraph: true,
  staticGraphWithDragAndDrop: false,
  height: 470,
  width: 760,
  node: {
    color: '#2563eb',
    fontColor: '#172033',
    fontSize: 12,
    fontWeight: 700,
    highlightStrokeColor: '#f59e0b',
    labelProperty: 'label',
    strokeWidth: 2,
  },
  link: {
    color: '#94a3b8',
    highlightColor: '#f59e0b',
    renderLabel: true,
    fontSize: 10,
    strokeWidth: 2,
  },
}

function GrafoAmigos() {
  const [ciudadSeleccionadaId, setCiudadSeleccionadaId] = useState(
    ciudades[0].id,
  )

  const ciudadSeleccionada = obtenerCiudadPorId(ciudadSeleccionadaId)
  const personasEnCiudad = useMemo(
    () => obtenerPersonasPorCiudad(ciudadSeleccionadaId),
    [ciudadSeleccionadaId],
  )

  const filasTabla = ciudades.flatMap((ciudad) =>
    obtenerPersonasPorCiudad(ciudad.id).map((persona) => ({
      ciudad,
      persona,
    })),
  )

  function manejarClicNodo(nodoId) {
    const ciudadEncontrada = ciudades.find((ciudad) => ciudad.id === nodoId)
    const personaEncontrada = personas.find((persona) => persona.id === nodoId)

    if (ciudadEncontrada) {
      setCiudadSeleccionadaId(ciudadEncontrada.id)
    }

    if (personaEncontrada) {
      setCiudadSeleccionadaId(personaEncontrada.ciudadId)
    }
  }

  return (
    <section className="challenge">
      <header className="challenge-header">
        <div>
          <p className="eyebrow">Reto 10</p>
          <h1>Grafo de amigos y ciudades</h1>
        </div>

        <div className="counter-box">
          <strong>{personas.length}</strong>
          <span>personas</span>
          <strong>{ciudades.length}</strong>
          <span>ciudades</span>
          <strong>{conexionesCiudades.length}</strong>
          <span>cercanías</span>
        </div>
      </header>

      <main className="content-grid">
        <article className="panel controls-panel">
          <label htmlFor="city-select">Selecciona una ciudad</label>
          <select
            id="city-select"
            value={ciudadSeleccionadaId}
            onChange={(event) => setCiudadSeleccionadaId(event.target.value)}
          >
            {ciudades.map((ciudad) => (
              <option value={ciudad.id} key={ciudad.id}>
                {ciudad.nombre}
              </option>
            ))}
          </select>

          <div className="city-result">
            <h2>Personas que viven en {ciudadSeleccionada.nombre}</h2>
            {personasEnCiudad.length > 0 ? (
              <ul>
                {personasEnCiudad.map((persona) => (
                  <li key={persona.id}>
                    <strong>{persona.nombre}</strong>
                    <span>{persona.edad} años</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay personas registradas en esta ciudad.</p>
            )}
          </div>

          <div className="friends-table">
            <h2>Tabla de amigos por ciudad</h2>
            <table>
              <thead>
                <tr>
                  <th>Ciudad</th>
                  <th>Amigo</th>
                  <th>Edad</th>
                </tr>
              </thead>
              <tbody>
                {filasTabla.map(({ ciudad, persona }) => (
                  <tr
                    className={
                      ciudad.id === ciudadSeleccionadaId ? 'active-row' : ''
                    }
                    key={persona.id}
                  >
                    <td>{ciudad.nombre}</td>
                    <td>{persona.nombre}</td>
                    <td>{persona.edad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="panel graph-panel">
          <Graph
            id="grafo-amigos-ciudades"
            data={datosGrafo}
            config={configuracionGrafo}
            onClickNode={manejarClicNodo}
          />
        </article>
      </main>
    </section>
  )
}

export default GrafoAmigos
