import { useState } from 'react';

function ContactForm({ onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAdd(name, phone);
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Teléfono"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default ContactForm;
