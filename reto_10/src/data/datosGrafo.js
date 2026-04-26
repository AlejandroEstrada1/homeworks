export const ciudades = [
  { id: 'ciudad-cali', nombre: 'Cali', x: 170, y: 330 },
  { id: 'ciudad-bogota', nombre: 'Bogotá', x: 390, y: 230 },
  { id: 'ciudad-medellin', nombre: 'Medellín', x: 300, y: 110 },
  { id: 'ciudad-barranquilla', nombre: 'Barranquilla', x: 590, y: 90 },
]

export const personas = [
  {
    id: 'persona-alejandro',
    nombre: 'Alejandro',
    edad: 21,
    ciudadId: 'ciudad-cali',
    x: 95,
    y: 250,
  },
  {
    id: 'persona-maria',
    nombre: 'María',
    edad: 22,
    ciudadId: 'ciudad-bogota',
    x: 485,
    y: 285,
  },
  {
    id: 'persona-camila',
    nombre: 'Camila',
    edad: 20,
    ciudadId: 'ciudad-cali',
    x: 120,
    y: 415,
  },
  {
    id: 'persona-juan',
    nombre: 'Juan',
    edad: 23,
    ciudadId: 'ciudad-medellin',
    x: 205,
    y: 70,
  },
  {
    id: 'persona-sofia',
    nombre: 'Sofía',
    edad: 19,
    ciudadId: 'ciudad-bogota',
    x: 380,
    y: 360,
  },
  {
    id: 'persona-andres',
    nombre: 'Andrés',
    edad: 24,
    ciudadId: 'ciudad-barranquilla',
    x: 650,
    y: 180,
  },
]

export const conexionesCiudades = [
  { source: 'ciudad-cali', target: 'ciudad-bogota', label: 'cerca de' },
  { source: 'ciudad-bogota', target: 'ciudad-medellin', label: 'cerca de' },
  {
    source: 'ciudad-medellin',
    target: 'ciudad-barranquilla',
    label: 'cerca de',
  },
]

export const datosGrafo = {
  nodes: [
    ...ciudades.map((ciudad) => ({
      id: ciudad.id,
      label: ciudad.nombre,
      tipo: 'ciudad',
      color: '#0f766e',
      size: 620,
      x: ciudad.x,
      y: ciudad.y,
    })),
    ...personas.map((persona) => ({
      id: persona.id,
      label: `${persona.nombre} (${persona.edad})`,
      tipo: 'persona',
      color: '#2563eb',
      size: 430,
      x: persona.x,
      y: persona.y,
    })),
  ],
  links: [
    ...conexionesCiudades,
    ...personas.map((persona) => ({
      source: persona.id,
      target: persona.ciudadId,
      label: 'vive en',
    })),
  ],
}

export function obtenerPersonasPorCiudad(ciudadId) {
  return personas.filter((persona) => persona.ciudadId === ciudadId)
}

export function obtenerCiudadPorId(ciudadId) {
  return ciudades.find((ciudad) => ciudad.id === ciudadId)
}
