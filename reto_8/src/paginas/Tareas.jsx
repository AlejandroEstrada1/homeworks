import { useState } from 'react'
import { useAuth } from '../contextos/ContextoAuth'
import { useTareas } from '../contextos/ContextoTareas'

function Tareas() {
  const { usuario, logout } = useAuth()
  const {
    tareas,
    agregarTarea,
    borrarTarea,
    cambiarEstadoTarea,
    editarTarea,
  } = useTareas()

  const [texto, setTexto] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [textoEditado, setTextoEditado] = useState('')

  const manejarSubmit = async (e) => {
    e.preventDefault()
    await agregarTarea(texto)
    setTexto('')
  }

  const iniciarEdicion = (tarea) => {
    setEditandoId(tarea.id)
    setTextoEditado(tarea.texto)
  }

  const guardarEdicion = async (id) => {
    if (!textoEditado.trim()) return
    await editarTarea(id, textoEditado)
    setEditandoId(null)
    setTextoEditado('')
  }

  const cancelarEdicion = () => {
    setEditandoId(null)
    setTextoEditado('')
  }

  const manejarLogout = async () => {
    await logout()
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h2 className="mb-1">Mis tareas</h2>
                <p className="mb-0 text-muted">
                  Usuario actual: <strong>{usuario?.email}</strong>
                </p>
              </div>

              <button
                type="button"
                className="btn btn-danger"
                onClick={manejarLogout}
              >
                Cerrar sesión
              </button>
            </div>

            <form onSubmit={manejarSubmit} className="row g-2 mb-4">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Escribe una nueva tarea"
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />
              </div>
              <div className="col-md-3 d-grid">
                <button type="submit" className="btn btn-primary">
                  Agregar
                </button>
              </div>
            </form>

            {tareas.length === 0 ? (
              <div className="alert alert-light text-center mb-0">
                No hay tareas todavía.
              </div>
            ) : (
              <div>
                {tareas.map((tarea) => (
                  <div key={tarea.id} className="list-group-item p-3">
                    {editandoId === tarea.id ? (
                      <>
                        <input
                          type="text"
                          className="form-control mb-3"
                          value={textoEditado}
                          onChange={(e) => setTextoEditado(e.target.value)}
                        />

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={() => guardarEdicion(tarea.id)}
                          >
                            Guardar
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={cancelarEdicion}
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                          <span
                            className="fs-5"
                            style={{
                              textDecoration: tarea.hecha ? 'line-through' : 'none',
                              opacity: tarea.hecha ? 0.7 : 1,
                            }}
                          >
                            {tarea.texto}
                          </span>

                          <span
                            className={`badge ${
                              tarea.hecha ? 'bg-success' : 'bg-warning text-dark'
                            }`}
                          >
                            {tarea.hecha ? 'Hecha' : 'Pendiente'}
                          </span>
                        </div>

                        <div className="d-flex gap-2 flex-wrap">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => cambiarEstadoTarea(tarea.id, tarea.hecha)}
                          >
                            {tarea.hecha ? 'Marcar pendiente' : 'Marcar hecha'}
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => iniciarEdicion(tarea)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => borrarTarea(tarea.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tareas