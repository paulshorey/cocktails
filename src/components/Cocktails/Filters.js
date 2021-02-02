import FiltersStyled from "./Filters.styled";
import Tag from "src/components/Tag";
import SelectEntries from "./SelectEntries";
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
      <div id="filterBy">
        <SelectEntries
          onClick={([value, columnName]) => {
            if (!!this.state.tags[value]) {
              this.remove_tag_by_value(value, columnName);
            } else {
              this.add_tag(value, columnName);
            }
          }}
          entries={this.props.cocktailsDb.allOtherTags()}
          selected={this.state.tags}
          title="Filter by Tag"
        />
        <SelectEntries
          onClick={([value, columnName]) => {
            if (!!this.state.tags[value]) {
              this.remove_tag_by_value(value, columnName);
            } else {
              this.add_tag(value, columnName);
            }
          }}
          entries={this.props.cocktailsDb.allIngredientsTags()}
          selected={this.state.tags}
          title="Filter by Ingredients"
        />
        {Object.entries(this.state.tags).map((entry) => {
          console.log("entry", entry);
          let [value, columnName] = entry;
          return (
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
          );
        })}
      </div>
    </FiltersStyled>
  );
}
