function MenuItem({ item, onSelect, level = 0 }) {
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    onSelect(item);
  };

  return (
    <div>
      <div
        className="menu-item"
        style={{ paddingLeft: `${16 + level * 18}px` }}
        onClick={handleClick}
      >
        <span>{item.title}</span>
        {hasChildren && <span className="arrow">▾</span>}
      </div>

      {hasChildren && (
        <div className="submenu">
          {item.children.map((child, index) => (
            <MenuItem
              key={`${child.title}-${index}`}
              item={child}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuItem;