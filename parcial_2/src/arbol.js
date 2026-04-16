export function sacarId() {
  return `nodo-${Math.floor(Math.random() * 1000000)}`
}

export function arreglarArbol(nodo) {
  const tipo = nodo?.tipo === 'archivo' ? 'archivo' : 'carpeta'

  return {
    id: nodo?.id || sacarId(),
    nombre: nodo?.nombre || 'sin nombre',
    tipo,
    creadoPor: nodo?.creadoPor || 'sin correo',
    fecha: nodo?.fecha || new Date().toISOString(),
    hijos:
      tipo === 'carpeta' && Array.isArray(nodo?.hijos)
        ? nodo.hijos.map((hijo) => arreglarArbol(hijo))
        : [],
  }
}

export function buscarNodo(nodo, idBuscado) {
  if (!nodo) {
    return null
  }

  if (nodo.id === idBuscado) {
    return nodo
  }

  for (const hijo of nodo.hijos || []) {
    const encontrado = buscarNodo(hijo, idBuscado)

    if (encontrado) {
      return encontrado
    }
  }

  return null
}

export function meterNodo(nodo, idPadre, nuevoNodo) {
  if (!nodo) {
    return {
      pudo: false,
      arbol: nodo,
    }
  }

  if (nodo.id === idPadre) {
    if (nodo.tipo === 'archivo') {
      return {
        pudo: false,
        arbol: nodo,
      }
    }

    return {
      pudo: true,
      arbol: {
        ...nodo,
        hijos: [...(nodo.hijos || []), nuevoNodo],
      },
    }
  }

  let cambio = false

  const hijosNuevos = (nodo.hijos || []).map((hijo) => {
    if (cambio) {
      return hijo
    }

    const intento = meterNodo(hijo, idPadre, nuevoNodo)

    if (intento.pudo) {
      cambio = true
      return intento.arbol
    }

    return hijo
  })

  return {
    pudo: cambio,
    arbol: {
      ...nodo,
      hijos: hijosNuevos,
    },
  }
}

export function sacarRuta(nodo, idBuscado, ruta = []) {
  if (!nodo) {
    return []
  }

  const rutaNueva = [...ruta, nodo.nombre]

  if (nodo.id === idBuscado) {
    return rutaNueva
  }

  for (const hijo of nodo.hijos || []) {
    const encontrada = sacarRuta(hijo, idBuscado, rutaNueva)

    if (encontrada.length > 0) {
      return encontrada
    }
  }

  return []
}
