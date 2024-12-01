import { useStore } from "../../app/ItemStore";
import { Content } from "@/app/types/ContentType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export const ListItemContent = ({ item }: Content) => {
  const { addItem, removeItem, updateItem } = useStore();
  return (
    <div>
      <div className="flex">
        <div className="">
          <RiDragMove2Fill className="text-black text-4xl bg-slate-200 rounded-md p-2" />
        </div>
        <div className="text-black pl-5 ">
          <span>
            <strong>{item.name}</strong>
            <p>{item.url}</p>
          </span>
        </div>

        <div className=" inline-flex border text-black border-black rounded-md ml-auto">
          <button
            className="ml-[10px]"
            onMouseDown={() => {
              updateItem(item.id, { isEdited: true });
            }}
          >
            Edit
          </button>
          <button
            className="ml-[10px] "
            onMouseDown={() => {
              addItem(item.id);
              updateItem(item.id, { isVisible: true });
            }}
          >
            Add
          </button>
          <button
            className="ml-[10px] text-red-700"
            onMouseDown={() => removeItem(item.id)}
          >
            Remove
          </button>
          <button
            className="mx-[10px] text-red-700"
            onMouseDown={() => {
              navigator.clipboard.writeText(item.url);
              toast.success("copied");
            }}
          >
            Copy
          </button>

          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        {item.children.length > 0 && (
          <MdKeyboardArrowDown
            className={twMerge(
              item.isVisible && "rotate-180",
              "text-black text-4xl"
            )}
            onMouseDown={() => {
              updateItem(item.id, { isVisible: !item.isVisible });
            }}
          />
        )}
      </div>
    </div>
  );
};
