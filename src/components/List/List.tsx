"use client";
import React from "react";
import { useStore } from "../../app/ItemStore";
import ListItem from "./ListItem";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const List = () => {
  const { items, addItem, setItems } = useStore();

  const handleDragEnd = (event: DragEndEvent) => setItems(event);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 0, distance: 0, tolerance: 0 },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="min-h-screen bg-slate-400">
      <div className="flex justify-center pt-8">
        <button
          className="bg-purple-700 p-2 rounded-md my-auto"
          onClick={() => addItem(null)}
        >
          Dodaj element główny
        </button>
      </div>

      {items.length === 0 ? (
        <div>pusta lista</div>
      ) : (
        <ul className="pl-4">
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <ListItem key={item.id} item={item} />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      )}
    </div>
  );
};

export default List;