import React from "react";
import { Table as TableStyled } from "./styled";
import Tag from "./Tag";
import Image from "next/image";
import cocktailsSchema from "src/data/cocktails";
const getCocktailsTable = cocktailsSchema.tableInterface.select;
const tableModel = cocktailsSchema.tableModel;

/*
 * I would usually split up a large component like this into smaller components, or at least, use functions
 *    instead of [].map(). But, this is a quick one off, and I already spent too much time on it.
 * When architecting or modularizing the code, I would first try to understand what features we'll need
 *    in the future. Otherwise, it doesn't make sense to refactor if nothing needs change.
 */
class Cocktails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: "", // ORDER BY ___ asc
      orderByDesc: false, // ORDER BY columnName ___
      tags: {} // dictionary of values to find in columns {[value]:"columnName",...}
      // "tags" are actually "filters", WHERE columnName=value
      // EXCEPTION:
      // To filter by any of the ingredients columns, use "ingredients" -
      // - it's not a real column name, but will match any of the ingredients columns
      // "WHERE ingredient1='val' OR ingredient2='val' OR ..."
    };
    // Initial data to populate table, also in this.state
    this.state.table = this.get_table(false); // collection of rows [{},{}]
  }

  render() {
    return (
      <>
        <TableStyled>
          {/*
           * Table Header (<thead><tr><th> equivalent)
           */}
          <div className="row row_th">
            {tableModel.columns.map((col, ci) => {
              return (
                <div
                  className="th"
                  key={col.key + "th"}
                  onClick={() => {
                    this.order_by(col.key, !this.state.orderByDesc);
                  }}
                >
                  <span>
                    {/* text before first cell */}
                    {ci === 0 && (
                      <span className="top_logo">
                        <span className="icon-cocktail-solid" />
                        <span> Cocktails</span>
                      </span>
                    )}
                    {/* text of each cell */}
                    <span className="top_label">{col.label}&nbsp;</span>
                    {/* icon sort asc/desc */}
                    {this.state.orderBy === col.key && (
                      <span className="top_sort">
                        {this.state.orderByDesc ? (
                          <span className="icon-caret-down-solid" />
                        ) : (
                          <span className="icon-caret-up-solid" />
                        )}
                      </span>
                    )}
                    {!this.state.orderBy && col.key === "strDrink" && (
                      <span className="top_sort">
                        <span className="icon-caret-down-solid" />
                        <span className="icon-caret-up-solid" />
                      </span>
                    )}
                    {/* text after last cell */}
                    {ci === tableModel.columns.length - 1 && (
                      <a className="top_etc" href="https://github.com/paulshorey/cocktails" target="_blank">
                        <span className="icon-code-regular hide-small" /> <span className="icon-github" />
                      </a>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          {/*
           * Table Body (<tbody><tr><td> equivalent)
           */}
          {this.state.table.map((row) => (
            <div className="row row_td" key={row[tableModel.keyColumn]}>
              {tableModel.columns.map((col) => {
                let value = col.value(row);
                if (!value) return null;
                /*
                 * Handle each content type differently (defined in model/interface)
                 */
                switch (col.type) {
                  // list type = clickable filters, add/remove tags
                  case "list": {
                    return (
                      <div className={"td colType_list"} key={col.key + "td"}>
                        {value.map((val) => (
                          <span
                            key={val + col.key}
                            onClick={() => {
                              if (!!this.state.tags[val]) {
                                this.remove_tag(val, col.key);
                              } else {
                                this.add_tag(val, col.key);
                              }
                            }}
                          >
                            <Tag
                              key={val}
                              value={val}
                              column={col.key}
                              remove={!!this.state.tags[val]}
                              onClick={() => {
                                this.add_tag(val, col.key);
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    );
                  }
                  // get image path from table
                  case "image": {
                    return (
                      <div className={"td colType_image"} key={col.key}>
                        <Image width={90} height={90} src={value} alt={row[tableModel.keyColumn]} />
                      </div>
                    );
                  }
                  // anything else, just let it out as a plain string
                  default: {
                    if (typeof value !== "string" && typeof value !== "number") return null;
                    return (
                      <div className={"td colType_" + col.key} key={col.key}>
                        <span>{value}</span>
                      </div>
                    );
                  }
                }
              })}
            </div>
          ))}
        </TableStyled>
      </>
    );
  }

  add_tag = (value, colName) => {
    if (!colName || !value) return;
    let tags = this.state.tags;
    tags[value] = colName;
    this.setState({ tags }, this.get_table);
  };

  remove_tag = (value, colName) => {
    let tags = this.state.tags;
    delete tags[value];
    this.setState({ tags }, this.get_table);
  };

  order_by = (column, desc = false) => {
    if (!column) return;
    if (column === "strDrinkThumb") {
      column = "strDrink";
    }
    this.setState({ orderBy: column, orderByDesc: desc }, this.get_table);
  };

  /**
   * Returns collection of rows matching specified criteria
   * @param updateState {boolean} - if false, will only return table data
   *    if true (default), will NOT return anything, but call this.setState({table})
   * @returns {array}
   */
  get_table = (updateState = true) => {
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
    let table = getCocktailsTable(query);
    if (updateState) {
      this.setState({ table });
    } else {
      return table;
    }
  };
}

export default Cocktails;
