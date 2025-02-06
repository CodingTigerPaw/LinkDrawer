import { useStore } from "../../app/ItemStore";
import { Content } from "@/app/types/ContentType";
import "react-toastify/dist/ReactToastify.css";
import { RiDragMove2Fill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import ButtonsGroup from "./ButtonsGroup";

export const ListItemContent = ({ item }: Content) => {
  const { updateItem } = useStore();
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
        <ButtonsGroup item={item} />

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
