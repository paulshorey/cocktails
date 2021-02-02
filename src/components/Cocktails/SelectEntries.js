import SelectStyled from "./SelectEntries.styled";
export default function ({ entries, selected = {}, title = "Filter", onClick = () => {} }) {
  if (!entries) return null;
  return (
    <SelectStyled className="Select">
      {/*<input className="input" type="text" placeholder={title} value="" />*/}
      <button className="label">
        {title}
        <span className="icon icon-caret-down-solid" />
      </button>
      <div className="options">
        {entries.map((entry) => {
          let [value, columnName] = entry;
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
                {value}
              </label>
            </span>
          );
        })}
      </div>
    </SelectStyled>
  );
}
