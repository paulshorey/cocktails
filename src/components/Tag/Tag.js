import React from "react";
import TagStyled from "./styled";
const Tag = function ({ value, active = false, onClick }) {
  if (!value) return null;
  return (
    <TagStyled onClick={onClick} className={active ? " active " : ""}>
      <span className="value">{value}</span>
      <span className="comma">,&nbsp;</span>
    </TagStyled>
  );
};
export default Tag;
