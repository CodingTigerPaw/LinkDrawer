"use client";
import { Dispatch } from "react";
import { useStore } from "../../app/ItemStore";
import { List } from "../../app/types/ListType";
import { SetStateAction } from "react";
import { useFormik } from "formik";
import { schema } from "../../app/schemas";

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
    onSubmit: (values) => {
      updateItem(item.id, { ...values, isEdited: false });
      // setIsEditing(false);
    },
    validationSchema: schema,
  });

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <div className="pt-5">
        <div className="">
          <label htmlFor="name" className="font-medium">
            Nazwa
          </label>
          <br />
          <input
            className="border border-[d0d5dd] rounded-md w-full my-[6px]"
            type="text"
            name="name"
            value={values.name}
            placeholder="Nazwa"
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <div>{errors.name && touched ? errors.name : null}</div>
        </div>
        <div>
          <label htmlFor="url">Link</label>
          <br />
          <input
            className="border border-[#d0d5dd] rounded-md w-full my-[6px]"
            type="text"
            name="url"
            value={values.url}
            placeholder="URL"
            onChange={handleChange}
          />
          <div>{errors.url && touched ? errors.url : null}</div>
        </div>
      </div>

      <button
        type="submit"
        style={{ marginLeft: "10px" }}
        className="rounded md border border-[#d0d5dd] p-[10px] text-[#6941C6] font-bold"
      >
        Dodaj
      </button>
      <button
        onMouseDown={() => {
          removeItem(item.id);
        }}
        style={{ marginLeft: "10px" }}
        className="rounded md border border-[#d0d5dd] p-[10px] text-[#6941C6] font-bold"
      >
        Usuń
      </button>
    </form>
  );
};
