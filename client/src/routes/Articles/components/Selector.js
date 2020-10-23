import React from "react";
import { NativeSelect } from "@material-ui/core";

export default function Selector({ handleSort }) {
  const [sort, setSort] = React.useState("none");

  const handleChange = (event) => {
    setSort(event.target.value);
    handleSort(event.target.value);
  };

  return (
    <div>
      <NativeSelect value={sort} onChange={handleChange} id="select">
        <option value="none">Default</option>
        <option value="addedOn">Latest</option>
        <option value="likesCount">Popular</option>
      </NativeSelect>
    </div>
  );
}
