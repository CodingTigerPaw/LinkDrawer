import { create } from "zustand";
import { List } from "./types/ListType";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";

interface itemStore {
  items: List[];
  setItems: (event: DragEndEvent) => void;
  addItem: (parentId: string | null) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, update: any) => void;
}

export const useStore = create<itemStore>()((set) => ({
  items: [],

  setItems: ({ active, over }) => {
    const findIdx = (arr: List[], e: any) =>
      arr.findIndex((el: List) => el.id === e.id);

    const updateRecursively = (
      items: List[],
      activeId: any,
      overId: string
    ): List[] => {
      const oldIndex = findIdx(items, { id: activeId });
      const newIndex = findIdx(items, { id: overId });

      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(items, oldIndex, newIndex);
      }

      return items.map((item) => ({
        ...item,
        children: updateRecursively(item.children, activeId, overId),
      }));
    };

    if (over || active.id !== over.id) {
      set((state) => ({
        items: updateRecursively(state.items, active.id, over.id),
      }));
    }
  },

  addItem: (parentId = null) => {
    const newItem = {
      id: uuid(),
      name: "",
      url: "",
      isVisible: true,
      isEdited: true,
      children: [],
      parentId,
    };
    set((state) => {
      const addRecursively = (items: List[], parentId: string): List[] => {
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
    });
  },

  removeItem: (id) =>
    set((state) => {
      const removeRecursively = (items: List[], idToRemove: string): any => {
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
      const updateRecursively = (items: List[], idToUpdate: string): any => {
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
