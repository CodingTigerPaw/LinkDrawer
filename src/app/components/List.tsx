"use client";
import React from "react";
import { useStore } from "../ItemStore";
import ListItem from "./ListItem";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const List = () => {
  const { items, addItem, setItems } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    setItems(event);
  };

  return (
    <div>
      <h1>Rekursywna Lista</h1>
      <button onClick={() => addItem(null)}>Dodaj element główny</button>
      <ul className="pl-4 bg-slate-400">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <ListItem key={item.id} item={item} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </div>
  );
};

export default List;
