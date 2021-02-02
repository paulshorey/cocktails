import React from "react";
import Results from "./Results";
import Filters from "./Filters";

class Cocktails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "", // ORDER BY ___ asc
      orderByDesc: false, // ORDER BY columnName ___
      tags: {} // dictionary of values to find in columns {[value]:"columnName",...}
      // "tags" are actually "filters", WHERE columnName=value
      // EXCEPTION:
      // To filter by any of the ingredients columns, use "strIngredients" -
      // - it's not a real column name, but will match any of the ingredients columns
      // "WHERE ingredient1='val' OR ingredient2='val' OR ..."
    };
    // Initial data to populate drinks, also in this.state
    this.state.drinks = this.get_drinks(false); // collection of rows [{},{}]
  }
  render() {
    const FiltersBound = Filters.bind(this);
    const ResultsBound = Results.bind(this);
    return (
      <>
        <FiltersBound />
        <ResultsBound />
      </>
    );
  }
  /* *****************************************************************************
   * LIFECYCLE METHODS:
   */

  /* *****************************************************************************
   * HELPER METHODS:
   */
  add_tag = (value, colName) => {
    if (!colName || !value) return;
    let tags = this.state.tags;
    tags[value] = colName;
    this.setState({ tags }, this.get_drinks);
  };

  remove_other_tags = () => {
    let tags = this.state.tags;
    for (let value in tags) {
      if (tags[value] !== "strIngredients") {
        delete tags[value];
      }
    }
    this.setState({ tags }, this.get_drinks);
  };

  other_tag = (value, colName) => {
    if (!colName || !value) return;
    let tags = this.state.tags;
    for (let value in tags) {
      if (tags[value] !== "strIngredients") {
        delete tags[value];
      }
    }
    tags[value] = colName;
    this.setState({ tags }, this.get_drinks);
  };

  remove_tag_by_value = (value) => {
    let tags = this.state.tags;
    delete tags[value];
    this.setState({ tags }, this.get_drinks);
  };

  remove_tag_by_column = (clearColumn) => {
    let tags = this.state.tags;
    for (let value in tags) {
      let columnName = tags[value];
      if (clearColumn === columnName) {
        delete tags[value];
        break;
      }
    }
    this.setState({ tags }, this.get_drinks);
  };

  order_by = (column, desc = false) => {
    // reset
    if (!column) {
      this.setState({ orderBy: "", orderByDesc: false }, this.get_drinks);
      return;
    }
    // set
    if (column === "strDrinkThumb") {
      column = "strDrink";
    }
    this.setState({ orderBy: column, orderByDesc: desc }, this.get_drinks);
  };

  clear_filters = () => {
    this.setState({ tags: {} }, this.get_drinks);
  };

  /**
   * Returns collection of rows matching specified criteria
   * @param updateState {boolean} - if false, will only return drinks data
   *    if true (default), will NOT return anything, but call this.setState({drinks})
   * @returns {array}
   */
  get_drinks = (updateState = true) => {
    // compile query from state
    let query = {};
    // order
    if (this.state.orderBy) {
      query.orderBy = this.state.orderBy;
      if (this.state.orderByDesc) {
        query.orderByDesc = this.state.orderByDesc;
      }
    }
    // where
    query.whereEquals = this.state.tags;
    // data
    let drinks = this.props.cocktailsDb.table.select(query);
    if (updateState) {
      this.setState({ drinks });
    }
    return drinks;
  };
}
export default Cocktails;
