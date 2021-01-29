import React from "react";
import { Tag as TagStyled } from "./styled";
const Tag = function ({ value, remove = false }) {
  if (!value) return null;
  return (
    <TagStyled className={remove ? " active " : ""}>
      <span className="value">{value}</span>
      {/*<span className="icon">*/}
      {/*  {remove ? <span className="icon-heart-solid x85" /> : <span className="icon-heart-regular x85" />}*/}
      {/*</span>*/}
      <span className="icon">{remove ? <>&ndash;</> : "+"}</span>
    </TagStyled>
  );
};
export default Tag;
