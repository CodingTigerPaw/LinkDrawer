"use client";
import { Dispatch } from "react";
import { useStore } from "../ItemStore";
import { List } from "../types/ListType";
import { SetStateAction } from "react";

type formProps = {
  item: List;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};
export const Form = ({ item, setIsEditing }: formProps) => {
  const { updateItem } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateItem(item.id, { [name]: value });
  };
  return (
    <form>
      <input
        type="text"
        name="name"
        value={item.name}
        placeholder="Nazwa"
        onChange={handleChange}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        name="url"
        value={item.url}
        placeholder="URL"
        onChange={handleChange}
      />
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        style={{ marginLeft: "10px" }}
      >
        Zapisz
      </button>
    </form>
  );
};
