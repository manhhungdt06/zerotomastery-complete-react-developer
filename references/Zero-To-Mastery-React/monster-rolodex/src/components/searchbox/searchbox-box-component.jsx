import React from "react";
import "./searchbox.css";

export const SearchBox = ({ placeHolder, searchFunction }) => {
  return (
    <input
      type="search"
      className="search"
      placeholder={placeHolder}
      onChange={searchFunction}
    />
  );
};
