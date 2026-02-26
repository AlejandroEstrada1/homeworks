export default function StudentList({ students, onDelete }) {
  return (
    <div>
      <h2>Lista de estudiantes</h2>

      {students.length === 0 ? (
        <p>No hay estudiantes registrados.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.code}>
                <td>{s.code}</td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>
                  <button onClick={() => onDelete(s.code)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}