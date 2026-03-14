import { useState } from "react";
import "./App.css";

class Cola {
  constructor(items = []) {
    this.items = items;
  }

  encolar(persona) {
    this.items.push(persona);
  }

  desencolar() {
    return this.items.length > 0 ? this.items.shift() : null;
  }

  frente() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  estaVacia() {
    return this.items.length === 0;
  }

  tamanio() {
    return this.items.length;
  }

  imprimir() {
    return [...this.items].sort(
      (a, b) => new Date(a.fechaLlegada) - new Date(b.fechaLlegada)
    );
  }
}

function generarFechaAleatoria() {
  const ahora = new Date();
  const minutosAleatorios = Math.floor(Math.random() * 120);
  const fecha = new Date(ahora.getTime() - minutosAleatorios * 60000);
  return fecha.toISOString();
}

function formatearFecha(fechaISO) {
  return new Date(fechaISO).toLocaleString("es-CO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function App() {
  const personasMock = [
    {
      nombre: "Alejandro Estrada",
      montoRetiro: 150000,
      fechaLlegada: "2026-03-14T08:10:00",
    },
    {
      nombre: "Laura Gómez",
      montoRetiro: 80000,
      fechaLlegada: "2026-03-14T08:18:00",
    },
    {
      nombre: "Carlos Pérez",
      montoRetiro: 220000,
      fechaLlegada: "2026-03-14T08:25:00",
    },
  ];

  const [cola, setCola] = useState(new Cola(personasMock));
  const [formulario, setFormulario] = useState({
    nombre: "",
    montoRetiro: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const agregarPersona = (e) => {
    e.preventDefault();

    if (!formulario.nombre.trim() || !formulario.montoRetiro.trim()) {
      alert("Completa todos los campos");
      return;
    }

    if (Number(formulario.montoRetiro) <= 0) {
      alert("El monto a retirar debe ser mayor a 0");
      return;
    }

    const nuevaCola = new Cola([...cola.items]);

    nuevaCola.encolar({
      nombre: formulario.nombre,
      montoRetiro: Number(formulario.montoRetiro),
      fechaLlegada: generarFechaAleatoria(),
    });

    setCola(nuevaCola);

    setFormulario({
      nombre: "",
      montoRetiro: "",
    });
  };

  const atenderPersona = () => {
    if (cola.estaVacia()) {
      alert("La cola está vacía");
      return;
    }

    const nuevaCola = new Cola([...cola.items]);
    nuevaCola.desencolar();
    setCola(nuevaCola);
  };

  const personaFrente = cola.frente();
  const personasOrdenadas = cola.imprimir();

  return (
    <div className="app">
      <h1>Reto 06 — Cola de personas en cajero</h1>
      <p className="subtitulo">
     
      </p>

      <div className="contenedor">
        <section className="panel">
          <h2>Agregar persona a la cola</h2>

          <form onSubmit={agregarPersona} className="formulario">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la persona"
              value={formulario.nombre}
              onChange={manejarCambio}
            />

            <input
              type="number"
              name="montoRetiro"
              placeholder="Monto a retirar"
              value={formulario.montoRetiro}
              onChange={manejarCambio}
            />

            <button type="submit">Encolar persona</button>
          </form>
        </section>

        <section className="panel">
          <h2>Información de la cola</h2>

          <div className="info">
            <p>
              <strong>Tamaño:</strong> {cola.tamanio()}
            </p>
            <p>
              <strong>¿Está vacía?:</strong> {cola.estaVacia() ? "Sí" : "No"}
            </p>
            <p>
              <strong>Primera persona en la cola:</strong>{" "}
              {personaFrente ? personaFrente.nombre : "No hay personas"}
            </p>
            <p>
              <strong>Monto del primero:</strong>{" "}
              {personaFrente
                ? `$${personaFrente.montoRetiro.toLocaleString("es-CO")}`
                : "No aplica"}
            </p>
          </div>

          <button className="boton-peligro" onClick={atenderPersona}>
            Desencolar / Atender persona
          </button>
        </section>
      </div>

      <section className="panel panel-cola">
        <h2>Cola en pantalla según fecha de llegada</h2>
        <p className="texto-pequeno">
         
        </p>

        {personasOrdenadas.length === 0 ? (
          <p>No hay personas en la cola</p>
        ) : (
          <div className="lista-personas">
            {personasOrdenadas.map((persona, index) => (
              <div className="tarjeta-persona" key={`${persona.nombre}-${index}`}>
                <h3>{persona.nombre}</h3>
                <p>
                  <strong>Monto a retirar:</strong> $
                  {persona.montoRetiro.toLocaleString("es-CO")}
                </p>
                <p>
                  <strong>Fecha de llegada:</strong>{" "}
                  {formatearFecha(persona.fechaLlegada)}
                </p>

                {index === 0 && <span className="insignia">PRIMERO</span>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

