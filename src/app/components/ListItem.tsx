import React, { useState } from "react";
import { Form } from "./Form";
import { List } from "../types/ListType";
import { useStore } from "../ItemStore";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ListItem = ({ item }: { item: List }) => {
  const { addItem, removeItem } = useStore();
  const [isEditing, setIsEditing] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <li>
      {isEditing ? (
        <Form item={item} setIsEditing={setIsEditing} />
      ) : (
        <div
          className="bg-white"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          style={style}
        >
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
        <div className=" ml-4">
          <ul>
            {item.children.map((child: List) => (
              <ListItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default ListItem;
