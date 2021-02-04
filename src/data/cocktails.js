import schemaInterface from "alasql";
import sql_cocktails_raw from "src/data/cocktailsSql";

/*
 * Prepare + aggregate data
 * this time-consuming process will only run once, no matter how many times this file is included!
 */
let sql_cocktails = sql_cocktails_raw.replace(/\\'/g, "'");
schemaInterface("DROP TABLE IF EXISTS drinks");
schemaInterface(sql_cocktails);
/*
 * Ingredients
 */
let all_ingredients_list = [];
let all_ingredients_dict = {};
let all_ingredients_rows = schemaInterface(
  `SELECT strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15 FROM drinks`
);
for (let row of all_ingredients_rows) {
  for (let n = 1; n <= 15; n++) {
    let value = row["strIngredient" + n];
    if (value) {
      if (!all_ingredients_dict[value]) {
        // add new
        all_ingredients_dict[value] = 1;
        all_ingredients_list.push(value);
      } else {
        // increment existing
        all_ingredients_dict[value]++;
      }
    }
  }
}
all_ingredients_list.sort((a, b) => all_ingredients_dict[b] - all_ingredients_dict[a]);
/*
 * Categories
 */
let all_categories_list = [];
let all_categories_dict = {};
let all_categories_rows = schemaInterface(`SELECT strCategory FROM drinks`);
for (let row of all_categories_rows) {
  let value = row["strCategory"];
  if (value) {
    if (!all_categories_dict[value]) {
      // add new
      all_categories_dict[value] = 1;
      all_categories_list.push(value);
    } else {
      // increment existing
      all_categories_dict[value]++;
    }
  }
}
all_categories_list.sort((a, b) => all_categories_dict[b] - all_categories_dict[a]);
/*
 * Alcoholic
 */
let all_alcoholic_list = [];
let all_alcoholic_dict = {};
let all_alcoholic_rows = schemaInterface(`SELECT strAlcoholic FROM drinks`);
for (let row of all_alcoholic_rows) {
  let value = row["strAlcoholic"];
  if (value) {
    if (!all_alcoholic_dict[value]) {
      // add new
      all_alcoholic_dict[value] = 1;
      all_alcoholic_list.push(value);
    } else {
      // increment existing
      all_alcoholic_dict[value]++;
    }
  }
}
all_alcoholic_list.sort((a, b) => all_alcoholic_dict[b] - all_alcoholic_dict[a]);
/*
 * IBA
 */
let all_iba_list = [];
let all_iba_dict = {};
let all_iba_rows = schemaInterface(`SELECT strIBA FROM drinks`);
for (let row of all_iba_rows) {
  let value = row["strIBA"];
  if (value) {
    if (!all_iba_dict[value]) {
      // add new
      all_iba_dict[value] = 1;
      all_iba_list.push(value);
    } else {
      // increment existing
      all_iba_dict[value]++;
    }
  }
}
all_iba_list.sort((a, b) => all_iba_dict[b] - all_iba_dict[a]);

/*
 * Export factory to be used by view
 */
export default class {
  /*
   * Table interface (controls from what table, and how many to display)
   */
  table = {
    /**
     * Get collection from cocktails table. If no options specified, returns all rows.
     * @param whereEquals {object} - each key is actually value WHERE ___="equalsValue"
     *      value of each item is the columnName
     *      EXCEPTION:
     *      If columnName is "strIngredients", special consideration will be given.
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
          if (column === "strIngredients") {
            // special case: combine ingredients columns
            let orWhere = "";
            for (let n = 1; n <= 15; n++) {
              if (n !== 1) orWhere += "OR ";
              orWhere += `strIngredient${n}="${value}" `;
            }
            where += `(${orWhere})`;
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
      console.log("SQL", sql);
      return schemaInterface(sql);
    }
  };

  /**
   * Ingredients in row
   * @param row {object} one row from table
   * @returns {array} list of tags (tuples), where each tag is ["value","columnName"]
   */
  rowIngredientsTags = (row) => {
    let tags = {};
    for (let i = 1; i <= 15; i++) {
      if (row[`strIngredient${i}`]) tags[row[`strIngredient${i}`]] = "strIngredients";
    }
    return tags;
  };

  /**
   * Ingredients tags in row
   * @param row {object} one row from table
   * @returns {array} list of tags (tuples), where each tag is ["value","columnName"]
   */
  rowTags = (row) => {
    let tags = [];
    for (let ing in this.rowIngredientsTags(row)) {
      tags.push([ing, "strIngredients"]);
    }
    for (let columnName of ["strCategory", "strIBA"]) {
      let value = row[columnName];
      if (!value) continue;
      tags.push([value, columnName]);
    }
    return tags;
  };

  /**
   * Ingredients tags
   * @returns {array} list of strings
   */
  allIngredients = () => {
    let tags = [];
    for (let value of all_ingredients_list) {
      tags.push([value, "strIngredients"]);
    }
    return tags;
  };

  /**
   * Ingredients tags
   * @returns {array} list of strings
   */
  allIngredientsTags = () => {
    let tags = [];
    for (let value of all_ingredients_list) {
      tags.push([value, "strIngredients"]);
    }
    return tags;
  };

  /**
   * Other tags
   * @returns {array} list of strings
   */
  allOtherTags = () => {
    let tags = [];
    for (let value of all_iba_list) {
      tags.push([value, "strIBA"]);
    }
    for (let value of all_alcoholic_list) {
      tags.push([value, "strAlcoholic"]);
    }
    for (let value of all_categories_list) {
      tags.push([value, "strCategory"]);
    }
    return tags;
  };
}

/*
idDrink,strDrink,strDrinkAlternate,strDrinkES,strDrinkDE,strDrinkFR,strDrinkZHHANS,strDrinkZHHANT,strTags,strVideo,strCategory,strIBA,strAlcoholic,strGlass,strInstructions,strInstructionsES,strInstructionsDE,strInstructionsFR,strInstructionsZHHANS,strInstructionsZHHANT,strDrinkThumb,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8,strMeasure9,strMeasure10,strMeasure11,strMeasure12,strMeasure13,strMeasure14,strMeasure15,strCreativeCommonsConfirmed,dateModified) VALUES (11379,'French "75"',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Cocktail',NULL,'Alcoholic','Collins glass','In a shaker half-filled with ice cubes, combine the gin, sugar, and lemon juice. Shake well. Pour into a collins glass. Top with the Champagne. Stir well and garnish with the orange slice and the cherry.',NULL,'In einem Shaker, der halb mit Eiswürfeln gefüllt ist, Gin, Zucker und Zitronensaft mischen. Gut schütteln. In ein Collins-Glas gießen. Mit dem Champagner auffüllen. Gut umrühren und mit der Orangenscheibe und der Kirsche garnieren.',NULL,NULL,NULL,'https://www.thecocktaildb.com/images/media/drink/qpvxsx1439906903.jpg','Gin','Sugar','Lemon juice','Champagne','Orange','Maraschino cherry',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'1 1/2 oz','2 tsp superfine','1 1/2 oz','4 oz Chilled','1','1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'No','2015-08-18 15:08:23');
*/
