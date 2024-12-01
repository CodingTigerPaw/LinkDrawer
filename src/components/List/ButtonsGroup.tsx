import React from "react";
import { useStore } from "../../app/ItemStore";
import { List } from "../../app/types/ListType";
import ToastNotifications from "../ToastNotification/ToastNotifications";
import { toast } from "react-toastify";

const ButtonsGroup = ({ item }: { item: List }) => {
  const { addItem, updateItem, removeItem } = useStore();
  return (
    <div className=" inline-flex border text-black border-slate-300 rounded-md ml-auto">
      <button
        className=" px-2 border-r border-r-slate-300"
        onMouseDown={() => {
          updateItem(item.id, { isEdited: true });
        }}
      >
        Edit
      </button>
      <button
        className=" px-2 border-r border-r-slate-300 "
        onMouseDown={() => {
          addItem(item.id);
          updateItem(item.id, { isVisible: true });
        }}
      >
        Add
      </button>
      <button
        className=" text-red-700 px-2 border-r border-r-slate-300"
        onMouseDown={() => removeItem(item.id)}
      >
        Remove
      </button>
      <button
        className="mx-[10px] text-red-700 "
        onMouseDown={() => {
          navigator.clipboard.writeText(item.url);
          toast.success("copied");
        }}
      >
        Copy
      </button>
      <ToastNotifications />
    </div>
  );
};

export default ButtonsGroup;
