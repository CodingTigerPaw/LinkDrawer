import { create } from "zustand";
import { List } from "./types/ListType";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

interface itemStore {
  items: List[];
  setItems: (event: DragEndEvent) => void;
  addItem: (parentId: number | null) => void;
  removeItem: (id: number) => void;
  updateItem: (id: number, update: any) => void;
}

export const useStore = create<itemStore>()((set) => ({
  items: [],

  setItems: (event) => {
    const { active, over } = event;

    // Jeśli `over` jest null lub przeciągany element nie zmienia miejsca, wyjdź
    if (!over || active.id === over.id) {
      return;
    }

    set((state) => {
      const items = state.items;
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      // Przestaw elementy w tablicy
      const newArray = arrayMove(items, oldIndex, newIndex);

      // Zwróć zaktualizowany stan
      return { items: newArray };
    });
  },

  addItem: (parentId = null) =>
    set((state) => {
      const newItem = {
        id: Date.now(),
        name: "",
        url: "",
        children: [],
        parentId,
      };

      const addRecursively = (items: List[], parentId: number): any => {
        return items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...item.children, newItem],
            };
          }
          return {
            ...item,
            children: addRecursively(item.children, parentId),
          };
        });
      };

      if (parentId === null) {
        return { items: [...state.items, newItem] };
      } else {
        return { items: addRecursively(state.items, parentId) };
      }
    }),
  removeItem: (id) =>
    set((state) => {
      const removeRecursively = (items: List[], idToRemove: number): any => {
        return items
          .filter((item) => item.id !== idToRemove)
          .map((item) => ({
            ...item,
            children: removeRecursively(item.children, idToRemove),
          }));
      };

      return { items: removeRecursively(state.items, id) };
    }),
  updateItem: (id, updates) =>
    set((state) => {
      const updateRecursively = (items: List[], idToUpdate: number): any => {
        return items.map((item) => {
          if (item.id === idToUpdate) {
            return {
              ...item,
              ...updates,
            };
          }
          return {
            ...item,
            children: updateRecursively(item.children, idToUpdate),
          };
        });
      };

      return { items: updateRecursively(state.items, id) };
    }),
}));
