import { create } from "zustand";
import { List } from "./types/ListType";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";

type Update = Partial<Omit<List, "id" | "children" | "parentId">>;

interface ItemStore {
  items: List[];
  setItems: (event: DragEndEvent) => void;
  addItem: (parentId: string | null) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, update: Update) => void;
}

export const useStore = create<ItemStore>()((set) => ({
  items: [],

  setItems: ({ active, over }) => {
    if (!over) return;

    const findIdx = (arr: List[], id: UniqueIdentifier): number =>
      arr.findIndex((el) => el.id === id);

    const updateRecursively = (
      items: List[],
      activeId: UniqueIdentifier,
      overId: UniqueIdentifier
    ): List[] => {
      const oldIndex = findIdx(items, activeId);
      const newIndex = findIdx(items, overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(items, oldIndex, newIndex);
      }

      return items.map((item) => ({
        ...item,
        children: updateRecursively(item.children, activeId, overId),
      }));
    };

    if (active.id !== over.id) {
      set((state) => ({
        items: updateRecursively(state.items, active.id, over.id),
      }));
    }
  },

  addItem: (parentId = null) => {
    const newItem: List = {
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
        return items.map((item) =>
          item.id === parentId
            ? { ...item, children: [...item.children, newItem] }
            : { ...item, children: addRecursively(item.children, parentId) }
        );
      };

      return parentId === null
        ? { items: [...state.items, newItem] }
        : { items: addRecursively(state.items, parentId) };
    });
  },

  removeItem: (id) =>
    set((state) => {
      const removeRecursively = (items: List[], idToRemove: string): List[] => {
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
      const updateRecursively = (items: List[], idToUpdate: string): List[] => {
        return items.map((item) =>
          item.id === idToUpdate
            ? { ...item, ...updates }
            : {
                ...item,
                children: updateRecursively(item.children, idToUpdate),
              }
        );
      };

      return { items: updateRecursively(state.items, id) };
    }),
}));
