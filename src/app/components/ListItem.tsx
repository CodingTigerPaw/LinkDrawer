import React, { useState } from "react";
import { Form } from "./Form";
import { List } from "../types/ListType";
import { useStore } from "../ItemStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItemContent } from "./ListItemContent";
import { twMerge } from "tailwind-merge";
import { CSSProperties } from "react";

const ListItem = ({ item }: { item: List }) => {
  const { addItem } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setVisible] = useState(true);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled: false });

  const myTransform = () => {
    return transform;
  };
  const style = {
    transition,
    transform: CSS.Translate.toString(transform && { ...transform, scaleY: 1 }),
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={twMerge(
        item.parentId && "border",
        "bg-white rounded-md m-2 p-2 mr-0 pr-0 "
      )}
    >
      <>
        {isEditing ? (
          <Form item={item} setIsEditing={setIsEditing} />
        ) : (
          <ListItemContent
            item={item}
            setIsEditing={setIsEditing}
            isVisible={isVisible}
            setIsVisible={setVisible}
          />
        )}
      </>

      {item.children.length > 0 && isVisible === true && (
        <div className=" ml-8">
          <ul>
            {item.children.map((child: List) => (
              <ListItem key={child.id} item={child} />
            ))}
          </ul>
        </div>
      )}
      <button
        className="text-black"
        onMouseDown={() => {
          addItem(item.id);
          setVisible(true);
        }}
      >
        Dodaj Element
      </button>
    </li>
  );
};

export default ListItem;
