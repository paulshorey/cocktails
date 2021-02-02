import FiltersStyled from "./Filters.styled";
import Tag from "src/components/Tag/Tag";
export default function () {
  return (
    <FiltersStyled className="content">
      <section id="sortBy">
        <b>Sort by: </b>
        {Object.entries({ strDrink: "name", strCategory: "category", strAlcoholic: "type" }).map(([column, label]) => {
          let value = (
            <>
              {label}{" "}
              {this.state.orderBy === column && (
                <span className="icon">
                  {this.state.orderByDesc ? (
                    <span className="icon-caret-down-solid" />
                  ) : (
                    <span className="icon-caret-up-solid" />
                  )}
                </span>
              )}
            </>
          );
          return (
            <Tag
              className="Tag"
              key={column}
              value={value}
              active={this.state.orderBy === column}
              onClick={() => {
                if (this.state.orderBy === column && this.state.orderByDesc) {
                  // reset
                  this.order_by();
                } else if (this.state.orderBy === column && !this.state.orderByDesc) {
                  // asc -> desc
                  this.order_by(column, true);
                } else {
                  // desc -> asc
                  this.order_by(column, false);
                }
              }}
            />
          );
        })}
      </section>
      <section id="filterByTags">
        <b>Filter by Tags: </b>
        {this.props.cocktailsDb.allOtherTags().map(([value, columnName]) => (
          <Tag
            className={"Tag"}
            key={value}
            value={value}
            active={!!this.state.tags[value]}
            onClick={() => {
              if (!this.state.tags[value]) {
                // remove other tags except the one being added
                this.other_tag(value, columnName);
              } else {
                // remove all tags other than ingredients
                this.remove_other_tags(columnName);
              }
            }}
          />
        ))}
      </section>
      <section id="filterByIngredients">
        <b>Filter by Ingredients: </b>
        {this.props.cocktailsDb.allIngredientsTags().map(([value, columnName]) => (
          <Tag
            className="Tag"
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
      </section>
    </FiltersStyled>
  );
}
