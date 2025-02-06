"use client";
import { useStore } from "../../app/ItemStore";
import { List } from "../../app/types/ListType";
import { useFormik } from "formik";
import { schema } from "../../app/schemas";
import Button from "../Button/";
import { twMerge } from "tailwind-merge";

type formProps = {
  item: List;
};
export const Form = ({ item }: formProps) => {
  const { updateItem, removeItem } = useStore();

  const { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: item.name || "",
      url: item.url || "",
    },
    onSubmit: (values) => updateItem(item.id, { ...values, isEdited: false }),
    validationSchema: schema,
  });

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <div className="pt-5">
        <div className="">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <br />
          <input
            className={twMerge(
              "border border-[d0d5dd] rounded-md w-full my-[6px] mr-[10px]",
              errors.name ? "border-red-700" : ""
            )}
            type="text"
            name="name"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <div className="text-red-700 text-xs">
            {errors.name && touched ? errors.name : null}
          </div>
        </div>
        <div>
          <label htmlFor="url">Link</label>
          <br />
          <input
            className={twMerge(
              "border border-[#d0d5dd] rounded-md w-full my-[6px] mr-[10px]",
              errors.url ? "border-red-700" : ""
            )}
            type="text"
            name="url"
            value={values.url}
            placeholder="URL"
            onChange={handleChange}
          />
          <div className="text-red-700 text-xs">
            {errors.url && touched ? errors.url : null}
          </div>
        </div>
      </div>

      <Button secondary type="submit" className="ml-[10px]">
        Add
      </Button>
      <Button
        secondary
        onClick={() => removeItem(item.id)}
        className="ml-[10px]"
      >
        Remove
      </Button>
    </form>
  );
};
