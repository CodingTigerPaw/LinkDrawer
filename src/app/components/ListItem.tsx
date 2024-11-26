import React, { useState } from "react";
import { useStore } from "../ItemStore";

const ListItem = ({ item }) => {
  const { addItem, removeItem, updateItem } = useStore();
  const [isEditing, setIsEditing] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateItem(item.id, { [name]: value });
  };

  return (
    <li>
      {isEditing ? (
        <form>
          <input
            type="text"
            name="name"
            value={item.name}
            placeholder="Nazwa"
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            name="url"
            value={item.url}
            placeholder="URL"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            style={{ marginLeft: "10px" }}
          >
            Zapisz
          </button>
        </form>
      ) : (
        <div>
          <span>
            <strong>{item.name}</strong> - {item.url}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "10px" }}
          >
            Edytuj
          </button>
        </div>
      )}
      <button onClick={() => addItem(item.id)} style={{ marginLeft: "10px" }}>
        Dodaj pod-element
      </button>
      <button
        onClick={() => removeItem(item.id)}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Usuń
      </button>
      {item.children.length > 0 && (
        <ul>
          {item.children.map((child) => (
            <ListItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ListItem;
