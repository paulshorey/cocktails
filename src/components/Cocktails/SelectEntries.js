import React, { useState } from "react";
import SelectStyled from "./SelectEntries.styled";
export default function ({ entries, selected = {}, title = "Filter", onClick = () => {} }) {
  if (!entries) return null;
  const [dropdownOpened, set_dropdownOpened] = useState(false);
  return (
    <SelectStyled className="SelectEntries">
      <div className="overlay" />
      <div className="label">
        <input
          className="label-input"
          type="text"
          placeholder={title}
          value=""
          onFocus={() => {
            set_dropdownOpened(true);
          }}
          onBlur={() => {
            set_dropdownOpened(false);
          }}
        />
        <span className="icon icon-caret-down-solid" />
        <div className={"options-dropdown" + (dropdownOpened ? " opened" : "")}>
          {entries.map((entry) => {
            if (!entry[0]) return null;
            let [value] = entry;
            return (
              <span
                className="option"
                key={value}
                onClick={() => {
                  onClick(entry);
                }}
              >
                <label>
                  <input type="checkbox" checked={selected[value]} />
                  <span>{value}</span>
                </label>
              </span>
            );
          })}
        </div>
      </div>
    </SelectStyled>
  );
}
