import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { menuTree } from "./data/menuData";

function App() {
  const [selectedItem, setSelectedItem] = useState(menuTree[0]);

  return (
    <div className="app-container">
      <Sidebar menu={menuTree} onSelect={setSelectedItem} />
      <Content item={selectedItem} />
    </div>
  );
}

export default App;