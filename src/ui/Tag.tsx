import React from "react";

const Tag = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="rounded-md bg-slate-800 bg-opacity-60 select-none text-sm px-2 py-1 text-white">
      {children}
    </div>
  );
};

export default Tag;
