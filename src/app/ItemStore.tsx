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
  items: [
    {
      id: 12345,
      name: "tezt",
      url: "http://test.pl",
      children: [],
      parentId: null,
    },
  ],

  setItems: ({ active, over }) => {
    const findIdx = (arr: List[], e: any) =>
      arr.findIndex((el: List) => el.id === e.id);

    if (over || active.id !== over.id) {
      set((state) => {
        const oldIndex = findIdx(state.items, active);
        const newIndex = findIdx(state.items, over);

        return { items: arrayMove(state.items, oldIndex, newIndex) };
      });
    }
  },

  addItem: (parentId = null) => {
    const newItem = {
      id: Date.now(),
      name: "",
      url: "",
      children: [],
      parentId,
    };
    set((state) => {
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
    });
  },

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
