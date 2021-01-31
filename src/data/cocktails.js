import schemaInterface from "alasql";
import sql_cocktails_raw from "src/data/cocktailsSql";

/*
 * In a real app, this would probably be refactored to use cached HTTP API or maybe IndexedDB.
 * Because of this abstraction, React components would not need to be refactored, because
 * no matter where we get the data from, the inputs/outputs of these methods should stay the same.
 */
let sql_cocktails = sql_cocktails_raw.replace(/\\'/g, "'");
schemaInterface("DROP TABLE IF EXISTS drinks");
schemaInterface(sql_cocktails);

export default class {
  /*
   * Table interface (controls from what table, and how many to display)
   */
  static tableInterface = {
    /**
     * Get collection from cocktails table. If no options specified, returns all rows.
     * @param whereEquals {object} - each key is actually value WHERE ___="equalsValue"
     *      value of each item is the columnName
     *      EXCEPTION:
     *      If columnName is "ingredients", special consideration will be given.
     *      The value will be searched accross all ingredients columns using " OR ".
     * @param orderBy {string} - optional, columnName to order by
     * @param orderByDesc {boolean} - if true, will order by 'desc' instead of default 'asc'
     * @param groupBy {string} - optional, group by columnName
     * @param pageNum {number} - number of results per page - default 50
     * @param startIndex {number} - which result to start on - default 0
     *      if total number of results exceeds (startIndex*pageNum), you'll get an empty array
     * @returns {array}
     */
    select: function ({
      whereEquals = {},
      orderBy = "",
      orderByDesc = false,
      groupBy = "",
      pageNum = 50,
      startIndex = 0
    } = {}) {
      // prepare SQL query parameters
      let where = "";
      if (whereEquals) {
        where = "";
        let i = 0;
        for (let value in whereEquals) {
          // separate subsequent rules with "AND"
          if (i !== 0) where += "AND ";
          // create rule for each value/column
          let column = whereEquals[value];
          if (column === "ingredients") {
            // special case: combine ingredients columns
            let orWhere = "";
            for (let n = 1; n <= 15; n++) {
              if (n !== 1) orWhere += "OR ";
              orWhere += `strIngredient${n}="${value}" `;
            }
            where += `(${orWhere})`;
          } else if (value === "Cocktail" || value === "Ordinary Drink") {
            // special case: combine redundant categories
            where += `(${column}="Cocktail" OR ${column}="Ordinary Drink")`;
          } else {
            // normal columnName=equalsValue
            where += `${column}="${value}" `;
          }
          // next
          i++;
        }
      }
      if (where) where = `WHERE ${where} `;
      if (orderBy) orderBy = `ORDER BY ${orderBy + (orderByDesc ? " desc" : " asc")} `;
      if (groupBy) groupBy = `GROUP BY ${groupBy} `;
      // execute SQL query
      let sql = `SELECT * FROM drinks ${where}${orderBy}${groupBy}LIMIT ${pageNum} OFFSET ${startIndex}`;
      // sql = `SELECT * FROM drinks WHERE strCategory="Ordinary Drink" LIMIT 50 OFFSET 0`;
      // console.log("SQL", sql);
      return schemaInterface(sql);
    }
  };
  /*
   * Columns model (columns to display, and their properties)
   */
  static tableModel = {
    keyColumn: "strDrink",
    columns: [
      {
        key: "strDrinkThumb",
        label: "",
        type: "image",
        value: (row) => row.strDrinkThumb
      },
      {
        key: "strDrink",
        label: "",
        type: "key",
        value: (row) => row.strDrink
      },
      {
        key: "ingredients",
        label: "ingredients",
        type: "list",
        /**
         * Will generate a list of "tags", like for a blog, except here it's ingredients in the cocktail.
         * @param row {object} - from table collection
         * @returns {array}
         */
        value: function (row) {
          let all_set = new Set();
          for (let i = 1; i <= 15; i++) {
            if (row[`strIngredient${i}`]) all_set.add(row[`strIngredient${i}`]);
          }
          return [...all_set];
        }
      },
      {
        key: "strCategory",
        label: "category",
        type: "list",
        value: function (row) {
          if (row.strCategory === "Ordinary Drink") {
            return ["Cocktail"];
          } else {
            return [row.strCategory];
          }
        }
      },
      {
        key: "strIBA",
        label: "info",
        type: "list",
        value: function (row) {
          return [row.strIBA];
        }
      },
      {
        key: "strAlcoholic",
        label: "type",
        type: "list",
        value: function (row) {
          return [row.strAlcoholic];
          // return [row[this.key] === "Alcoholic" ? "yes" : "no"];
        }
      }
    ]
  };
}
