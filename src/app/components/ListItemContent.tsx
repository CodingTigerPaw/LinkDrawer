import { useStore } from "../ItemStore";
import { List } from "../types/ListType";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

type Content = {
  item: List;
  setIsEditing: (arg: boolean) => void;
  setIsVisible: (arg: boolean) => void;
  isVisible: boolean;
};

export const ListItemContent = ({
  item,
  setIsEditing,
  setIsVisible,
  isVisible,
}: Content) => {
  const { addItem, removeItem } = useStore();
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

        <div
          id="buttons"
          className=" inline-flex border text-black border-black rounded-md ml-auto"
        >
          <button
            className=""
            onMouseDown={() => {
              setIsEditing(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            Edytuj
          </button>
          <button
            className=" "
            onMouseDown={() => {
              addItem(item.id);
              setIsVisible(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            Dodaj pod-element
          </button>
          <button
            onMouseDown={() => removeItem(item.id)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Usuń
          </button>
          <button
            onMouseDown={() => {
              navigator.clipboard.writeText(item.url);
              toast.success("copied");
            }}
            style={{ marginLeft: "10px", color: "red" }}
          >
            copy
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
        <MdKeyboardArrowDown
          className={twMerge(isVisible && "rotate-180", "text-black text-4xl")}
          onMouseDown={() => setIsVisible(!isVisible)}
        />
      </div>
    </div>
  );
};
