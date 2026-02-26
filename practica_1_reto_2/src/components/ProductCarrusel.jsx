import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { buildCircularDoublyLinkedList } from "../structures/CircularDoublyLinkedList";

export default function ProductCarrusel() {
  const [products] = useState([
    {
      id: "P001",
      name: "Teclado Mecánico",
      description: "Switches rojos, RGB.",
      price: 180000,
      image: "https://picsum.photos/seed/keyboard/600/400",
    },
    {
      id: "P002",
      name: "Mouse Gamer",
      description: "Alta precisión, 12000 DPI.",
      price: 90000,
      image: "https://picsum.photos/seed/mouse/600/400",
    },
    {
      id: "P003",
      name: "Audífonos",
      description: "Sonido envolvente 7.1",
      price: 150000,
      image: "https://picsum.photos/seed/headphones/600/400",
    },
    {
      id: "P004",
      name: "Monitor 24”",
      description: "Full HD 75Hz IPS",
      price: 520000,
      image: "https://picsum.photos/seed/monitor/600/400",
    },
  ]);

  const head = useMemo(() => buildCircularDoublyLinkedList(products), [products]);
  const [currentNode, setCurrentNode] = useState(head);

  useEffect(() => {
    setCurrentNode(head);
  }, [head]);

  const nextProduct = () => {
    setCurrentNode((prev) => prev?.next ?? prev);
  };

  const prevProduct = () => {
    setCurrentNode((prev) => prev?.prev ?? prev);
  };

  // Cambio automático cada 3 segundos
  useEffect(() => {
    if (!currentNode) return;

    const interval = setInterval(() => {
      setCurrentNode((prev) => prev?.next ?? prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentNode]);

  return (
    <div style={styles.container}>
      <h1>Práctica 1 - Reto 2</h1>

      <div style={styles.row}>
        <button onClick={prevProduct}>◀</button>

        <ProductCard product={currentNode?.data} />

        <button onClick={nextProduct}>▶</button>
      </div>

      <p style={{ marginTop: 10 }}>
        Producto actual: {currentNode?.data?.id}
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
};