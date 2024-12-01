import React from "react";

type Props = {};

const EmptyList = (props: Props) => {
  return (
    <div className=" h-[200px] text-black m-4 bg-white rounded-md text-center">
      <p className="p-8">Empty list</p>
      <p>add some items to begin</p>
    </div>
  );
};

export default EmptyList;
