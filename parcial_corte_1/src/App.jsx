import { useEffect, useRef, useState } from "react";
import {
  LinkedList,
  DoublyLinkedList,
  CircularLinkedList,
  CircularDoublyLinkedList,
} from "./Estructuras/list";
import "./App.css";

export default function App() {
  const [listaDisponibles] = useState(() => new LinkedList());
  const [listaHistorial] = useState(() => new DoublyLinkedList());
  const [listaDestacados] = useState(() => new CircularLinkedList());
  const [listaInversionistas] = useState(() => new CircularDoublyLinkedList());

  const [disponibles, setDisponibles] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [vehiculoDestacado, setVehiculoDestacado] = useState(null);

  const cargado = useRef(false);

  useEffect(() => {
    if (cargado.current) return;
    cargado.current = true;

    const vehiculos = [
      { id: 1, nombre: "Toyota Corolla" },
      { id: 2, nombre: "Mazda 2" },
      { id: 3, nombre: "Kia Picanto" },
      { id: 4, nombre: "Chevrolet Onix" },
    ];

    vehiculos.forEach((v) => {
      listaDisponibles.agregar(v);
      listaDestacados.agregar(v);
    });

    listaInversionistas.construirDesdeArreglo([
      { id: 1, nombre: "Ana" },
      { id: 2, nombre: "Luis" },
      { id: 3, nombre: "Sofía" },
    ]);

    setDisponibles(listaDisponibles.imprimir());
    setHistorial(listaHistorial.imprimir());
  }, []);

  useEffect(() => {
    let actual = listaDestacados.cabeza;

    const intervalo = setInterval(() => {
      if (!actual) return;
      setVehiculoDestacado(actual.valor);
      actual = actual.siguiente;
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const alquilarVehiculo = (id) => {
    const alquilado = listaDisponibles.borrarPorId(id);
    if (!alquilado) return;

    listaHistorial.agregar(alquilado);

    setDisponibles(listaDisponibles.imprimir());
    setHistorial(listaHistorial.imprimir());
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Parcial</h1>
        
      </header>

      <div className="grid">
        <section className="card">
          <div className="cardHead">
            <h2>Vehículo destacado</h2>
            <span className="tag">Lista circular</span>
          </div>

          <div className="highlight">
            {vehiculoDestacado ? vehiculoDestacado.nombre : "Esperando..."}
          </div>
          <p className="hint">Cambia automáticamente </p>
        </section>

        <section className="card">
          <div className="cardHead">
            <h2>Inversionistas activos</h2>
            <span className="tag">Lista circular doble</span>
          </div>

          <div className="simpleList">
            {listaInversionistas.imprimir().map((inv, i) => (
              <div className="row" key={i}>
                {inv.nombre}
              </div>
            ))}
          </div>
        </section>

        <section className="card wide">
          <div className="cardHead">
            <h2>Vehículos disponibles</h2>
            <span className="tag">Lista enlazada</span>
          </div>

          {disponibles.length === 0 ? (
            <div className="empty">No hay vehículos disponibles.</div>
          ) : (
            <div className="simpleList">
              {disponibles.map((v) => (
                <div className="row between" key={v.id}>
                  <span>{v.nombre}</span>
                  <button className="btn" onClick={() => alquilarVehiculo(v.id)}>
                    Alquilar
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="hint">
          
          </p>
        </section>

        <section className="card wide">
          <div className="cardHead">
            <h2>Historial de alquileres</h2>
            <span className="tag">Lista doblemente enlazada</span>
          </div>

          {historial.length === 0 ? (
            <div className="empty">Sin historial.</div>
          ) : (
            <div className="simpleList">
              {historial.map((v, i) => (
                <div className="row" key={i}>
                  {v.nombre}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}