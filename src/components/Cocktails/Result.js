import React from "react";
import ResultStyled from "./Result.styled";
import Image from "next/image";
import Tag from "src/components/Tag/Tag";

export default function ({ row }) {
  return (
    <ResultStyled className="Result">
      <Image className={"image"} width={90} height={90} src={row.strDrinkThumb} alt={row.strDrink} />

      <h3 className={"title"}>{row.strDrink}</h3>

      <div className={"tags"}>
        {this.props.cocktailsDb.rowTags(row).map(([value, columnName]) => (
          <Tag
            key={value}
            value={value}
            active={!!this.state.tags[value]}
            onClick={() => {
              if (!!this.state.tags[value]) {
                this.remove_tag_by_value(value, columnName);
              } else {
                this.add_tag(value, columnName);
              }
            }}
          />
        ))}
      </div>
    </ResultStyled>
  );
}
