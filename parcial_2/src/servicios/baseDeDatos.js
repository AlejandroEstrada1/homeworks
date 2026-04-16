import { doc, getDoc, setDoc } from 'firebase/firestore'
import { arreglarArbol } from '../arbol'
import { db } from '../firebase'

const llaveLocal = 'parcial2_arbol_guardado'

const usuariosBase = [
  'estudiante@uao.edu.co',
  'profe@uao.edu.co',
  'maria@uao.edu.co',
]

const arbolBase = {
  id: 'raiz',
  nombre: 'Mis cosas',
  tipo: 'carpeta',
  creadoPor: 'sistema@mock.com',
  fecha: '2026-04-15T00:00:00.000Z',
  hijos: [
    {
      id: 'carpeta-demo',
      nombre: 'Trabajos',
      tipo: 'carpeta',
      creadoPor: 'estudiante@uao.edu.co',
      fecha: '2026-04-15T00:10:00.000Z',
      hijos: [
        {
          id: 'archivo-demo',
          nombre: 'nota_parcial.txt',
          tipo: 'archivo',
          creadoPor: 'estudiante@uao.edu.co',
          fecha: '2026-04-15T00:11:00.000Z',
          hijos: [],
        },
      ],
    },
  ],
}

export const datosIniciales = {
  arbol: arbolBase,
  usuariosRegistrados: usuariosBase,
}

function arreglarDatos(data) {
  return {
    arbol: arreglarArbol(data?.arbol || arbolBase),
    usuariosRegistrados: Array.isArray(data?.usuariosRegistrados)
      ? data.usuariosRegistrados.map((item) => String(item).toLowerCase())
      : usuariosBase,
  }
}

async function cargarDesdeFirebase() {
  const referencia = doc(db, 'parcial2', 'arbol-general')
  const documento = await getDoc(referencia)

  if (!documento.exists()) {
    await setDoc(referencia, datosIniciales)
    return datosIniciales
  }

  return arreglarDatos(documento.data())
}

function cargarDesdeLocal() {
  const guardado = localStorage.getItem(llaveLocal)

  if (!guardado) {
    localStorage.setItem(llaveLocal, JSON.stringify(datosIniciales))
    return datosIniciales
  }

  try {
    return arreglarDatos(JSON.parse(guardado))
  } catch {
    localStorage.setItem(llaveLocal, JSON.stringify(datosIniciales))
    return datosIniciales
  }
}

export async function cargarDatosDelParcial() {
  if (db) {
    try {
      return {
        datos: await cargarDesdeFirebase(),
        modo: 'firebase',
      }
    } catch {
      return {
        datos: cargarDesdeLocal(),
        modo: 'mock',
      }
    }
  }

  return {
    datos: cargarDesdeLocal(),
    modo: 'mock',
  }
}

export async function guardarDatosDelParcial(datos) {
  const datosLimpios = arreglarDatos(datos)

  if (db) {
    try {
      const referencia = doc(db, 'parcial2', 'arbol-general')
      await setDoc(referencia, datosLimpios)

      return {
        ok: true,
        modo: 'firebase',
      }
    } catch {
      localStorage.setItem(llaveLocal, JSON.stringify(datosLimpios))

      return {
        ok: true,
        modo: 'mock',
      }
    }
  }

  localStorage.setItem(llaveLocal, JSON.stringify(datosLimpios))

  return {
    ok: true,
    modo: 'mock',
  }
}
