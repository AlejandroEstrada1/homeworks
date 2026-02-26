export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.img} />
      <h2 style={styles.title}>{product.name}</h2>
      <p style={styles.desc}>{product.description}</p>
      <p style={styles.price}>${product.price.toLocaleString("es-CO")}</p>
    </div>
  );
}

const styles = {
  card: {
    width: 340,
    padding: 16,
    border: "1px solid #ddd",
    borderRadius: 14,
    background: "#fff",
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  img: {
    width: "100%",
    height: 190,
    objectFit: "cover",
    borderRadius: 12,
  },
  title: { margin: "12px 0 6px" },
  desc: { margin: 0, opacity: 0.8 },
  price: { marginTop: 10, fontWeight: "bold", fontSize: 18 },
};