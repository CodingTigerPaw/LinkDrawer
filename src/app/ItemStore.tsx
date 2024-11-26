import { create } from "zustand";

export const useStore = create((set) => ({
  items: [],
  addItem: (parentId = null) =>
    set((state) => {
      const newItem = {
        id: Date.now(),
        name: "",
        url: "",
        children: [],
        parentId,
      };

      const addRecursively = (items, parentId) => {
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
      const removeRecursively = (items, idToRemove) => {
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
      const updateRecursively = (items, idToUpdate) => {
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
