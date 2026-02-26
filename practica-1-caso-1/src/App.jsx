import { useEffect, useMemo, useRef, useState } from "react";
import StudentList from "./components/StudentList";

// Nodo: { code, name, age, next }
function addNode(head, newNode) {
  if (!head) return { ...newNode, next: null };

  const newHead = { ...head, next: head.next };
  let curr = newHead;

  while (curr.next) {
    curr.next = { ...curr.next, next: curr.next.next };
    curr = curr.next;
  }

  curr.next = { ...newNode, next: null };
  return newHead;
}

function removeNodeByCode(head, codeToRemove) {
  if (!head) return null;

  if (head.code === codeToRemove) {
    return head.next ? { ...head.next } : null;
  }

  const newHead = { ...head, next: head.next };
  let prev = newHead;
  let curr = prev.next;

  while (curr) {
    curr = { ...curr, next: curr.next };
    prev.next = curr;

    if (curr.code === codeToRemove) {
      prev.next = curr.next ? { ...curr.next } : null;
      return newHead;
    }

    prev = curr;
    curr = curr.next;
  }

  return newHead;
}

function toArray(head) {
  const arr = [];
  let curr = head;
  while (curr) {
    arr.push({ code: curr.code, name: curr.name, age: curr.age });
    curr = curr.next;
  }
  return arr;
}

export default function App() {
  const [head, setHead] = useState(null);

  const prevCodesRef = useRef(new Set());
  const studentsArray = useMemo(() => toArray(head), [head]);

  useEffect(() => {
    const prev = prevCodesRef.current;
    const now = new Set(studentsArray.map((s) => s.code));

    for (const c of now) {
      if (!prev.has(c)) console.log("✅ Agregado:", c);
    }

    for (const c of prev) {
      if (!now.has(c)) console.log("🗑️ Eliminado:", c);
    }

    prevCodesRef.current = now;
  }, [studentsArray]);

  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.target;

    const code = form.code.value.trim();
    const name = form.name.value.trim();
    const age = Number(form.age.value);

    if (!code || !name || Number.isNaN(age)) return;

    if (studentsArray.some((s) => s.code === code)) {
      alert("Ese código ya existe.");
      return;
    }

    setHead((prevHead) =>
      addNode(prevHead, { code, name, age })
    );

    form.reset();
    form.code.focus();
  };

  const handleDelete = (code) => {
    setHead((prevHead) =>
      removeNodeByCode(prevHead, code)
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: 20 }}>
      <h1>Práctica 1 - Caso 1</h1>

      <form onSubmit={handleAdd} style={{ display: "grid", gap: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 10 }}>
          <input name="code" placeholder="Código" />
          <input name="name" placeholder="Nombre" />
          <input name="age" type="number" placeholder="Edad" />
        </div>
        <button type="submit">Agregar estudiante</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <StudentList
        students={studentsArray}
        onDelete={handleDelete}
      />
    </div>
  );
}
