function ListaContactos({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id} style={{ marginBottom: 10 }}>
          {contact.name} - {contact.phone}
          <button
            onClick={() => onDelete(contact.id)}
            style={{ marginLeft: 10 }}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ListaContactos;

