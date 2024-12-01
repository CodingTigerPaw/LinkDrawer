import React from "react";
import { Form } from "../Form";
import { List } from "../../app/types/ListType";
import { useStore } from "../../app/ItemStore";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ListItemContent } from "./ListItemContent";
import { twMerge } from "tailwind-merge";

const ListItem = ({ item }: { item: List }) => {
  const { addItem } = useStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id, disabled: false });

  const style = {
    transition,
    transform: CSS.Translate.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
  };

  return (
    <li
      ref={setNodeRef}
      // {...attributes}
      {...listeners}
      style={style}
      className={twMerge(
        "bg-white rounded-md m-2 p-2",
        item.parentId && "border mr-0 pr-0"
      )}
    >
      <>
        {item.isEdited ? <Form item={item} /> : <ListItemContent item={item} />}
      </>

      {item.children.length > 0 && item.isVisible === true && (
        <div className=" ml-8">
          <SortableContext items={item.children}>
            <ul>
              {item.children.map((child: List) => (
                <ListItem key={child.id} item={child} />
              ))}
            </ul>
          </SortableContext>
        </div>
      )}
      <button
        className="text-white bg-purple-600 p-1 rounded-md mt-2"
        onMouseDown={() => {
          addItem(item.id);
        }}
      >
        Dodaj Element
      </button>
    </li>
  );
};

export default ListItem;
