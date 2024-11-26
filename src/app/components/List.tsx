"use client";
import React from "react";
import { useStore } from "../ItemStore";
import ListItem from "./ListItem";

const List = () => {
  const { items, addItem } = useStore();

  return (
    <div>
      <h1>Rekursywna Lista</h1>
      <button onClick={() => addItem(null)}>Dodaj element główny</button>
      <ul>
        {items.map((item) => (
          <ListItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default List;
