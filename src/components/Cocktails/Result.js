import React from "react";
import ResultStyled from "./Result.styled";
import Image from "next/image";
import Tag from "src/components/Tag/Tag";

export default function ({ row }) {
  return (
    <ResultStyled className="Result">
      <span className={"image loading_gradient_animation"}>
        <Image width={90} height={90} src={row.strDrinkThumb} alt={row.strDrink} />
      </span>

      <h3 className={"title"}>{row.strDrink}</h3>

      <div className={"tags"}>
        {Object.entries(this.props.cocktailsDb.rowIngredientsTags(row)).map(([value, columnName]) => (
          <Tag
            key={value}
            value={value}
            active={!!this.state.tags[value] || this.state.orderBy === columnName}
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
