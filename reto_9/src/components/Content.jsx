function Content({ item }) {
  const ComponenteSeleccionado = item.component;

  return (
    <main className="content">
      <div className="content-card">
        <h1 className="content-title">{item.title}</h1>
        <p className="content-link">
          <strong>Ruta:</strong> {item.link}
        </p>

        <div className="component-preview">
          <ComponenteSeleccionado />
        </div>
      </div>
    </main>
  );
}

export default Content;