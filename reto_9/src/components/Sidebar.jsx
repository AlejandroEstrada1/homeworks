import MenuItem from "./MenuItem";
import "./Sidebar.css";

function Sidebar({ menu, onSelect }) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Reto 09</h1>
      <p className="sidebar-subtitle">Menú Árbol N-ario</p>

      <nav className="menu">
        {menu.map((item, index) => (
          <MenuItem
            key={`${item.title}-${index}`}
            item={item}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;