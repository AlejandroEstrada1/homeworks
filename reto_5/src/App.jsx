import { useState } from "react";
import "./App.css";

class Pila {
  constructor(items = []) {
    this.items = items;
  }

  push(valor) {
    this.items.push(valor);
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
  }

  estaVacia() {
    return this.items.length === 0;
  }

  tamanio() {
    return this.items.length;
  }

  imprimir() {
    return [...this.items].reverse();
  }
}

function App() {
  const librosMock = [
    {
      nombre: "Clean Code",
      isbn: "9780132350884",
      autor: "Robert C. Martin",
      editorial: "Prentice Hall",
    },
    {
      nombre: "El programador pragmático",
      isbn: "9780201616224",
      autor: "Andrew Hunt",
      editorial: "Addison-Wesley",
    },
    {
      nombre: "JavaScript: The Good Parts",
      isbn: "9780596517748",
      autor: "Douglas Crockford",
      editorial: "O'Reilly",
    },
  ];

  const [pila, setPila] = useState(new Pila(librosMock));

  const [formulario, setFormulario] = useState({
    nombre: "",
    isbn: "",
    autor: "",
    editorial: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const agregarLibro = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.isbn ||
      !formulario.autor ||
      !formulario.editorial
    ) {
      alert("Completa todos los campos");
      return;
    }

    const nuevaPila = new Pila([...pila.items]);

    nuevaPila.push({
      nombre: formulario.nombre,
      isbn: formulario.isbn,
      autor: formulario.autor,
      editorial: formulario.editorial,
    });

    setPila(nuevaPila);

    setFormulario({
      nombre: "",
      isbn: "",
      autor: "",
      editorial: "",
    });
  };

  const eliminarLibro = () => {
    if (pila.estaVacia()) {
      alert("La pila está vacía");
      return;
    }

    const nuevaPila = new Pila([...pila.items]);
    nuevaPila.pop();
    setPila(nuevaPila);
  };

  const libroTope = pila.peek();
  const librosImpresos = pila.imprimir();

  return (
    <div className="app">
      <h1>Reto 5 — Pila de Libros</h1>

      <div className="container">
        <section className="panel">
          <h2>Agregar libro</h2>

          <form onSubmit={agregarLibro} className="book-form">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del libro"
              value={formulario.nombre}
              onChange={manejarCambio}
            />

            <input
              type="text"
              name="isbn"
              placeholder="ISBN"
              value={formulario.isbn}
              onChange={manejarCambio}
            />

            <input
              type="text"
              name="autor"
              placeholder="Autor"
              value={formulario.autor}
              onChange={manejarCambio}
            />

            <input
              type="text"
              name="editorial"
              placeholder="Editorial"
              value={formulario.editorial}
              onChange={manejarCambio}
            />

            <button type="submit">Push (Agregar)</button>
          </form>
        </section>

        <section className="panel">
          <h2>Información de la pila</h2>

          <p><strong>Tamaño:</strong> {pila.tamanio()}</p>
          <p><strong>¿Está vacía?:</strong> {pila.estaVacia() ? "Sí" : "No"}</p>
          <p>
            <strong>Libro en el tope:</strong>{" "}
            {libroTope ? libroTope.nombre : "No hay libros"}
          </p>

          <button className="danger" onClick={eliminarLibro}>
            Pop (Eliminar último)
          </button>
        </section>
      </div>

      <section className="panel stack-panel">
        <h2>Impresión de la pila</h2>

        {librosImpresos.length === 0 ? (
          <p>No hay libros</p>
        ) : (
          <div className="books-list">
            {librosImpresos.map((libro, index) => (
              <div className="book-card" key={index}>
                <h3>{libro.nombre}</h3>
                <p><strong>ISBN:</strong> {libro.isbn}</p>
                <p><strong>Autor:</strong> {libro.autor}</p>
                <p><strong>Editorial:</strong> {libro.editorial}</p>

                {index === 0 && <span className="top-badge">TOPE</span>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
