import { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm';
import ListaContactos from './components/ListaContactos';

const initialContacts = [
  { id: 1, name: 'Juan', phone: '3001234567' },
  { id: 2, name: 'Ana', phone: '3107654321' },
];

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(initialContacts);
  }, []);

  const addContact = (name, phone) => {
    const newContact = { id: Date.now(), name, phone };
    setContacts(prev => [...prev, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div style={{ padding: 16, fontFamily: 'Arial' }}>
      <h1>Contactos</h1>
      <ContactForm onAdd={addContact} />
      <ListaContactos contacts={contacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;



