import React from "react";
import Result from "./Result";
import ResultsStyled from "./Results.styled";

export default function () {
  const ResultBound = Result.bind(this);
  return (
    <>
      <ResultsStyled className="content">
        {this.state.drinks.length < 1 ? (
          <section>
            <p>Nothing found</p>
            <p>
              <button
                className="link"
                onClick={() => {
                  this.clear_filters();
                }}
              >
                clear filters
              </button>
            </p>
          </section>
        ) : (
          <>
            {this.state.drinks.map((row) => (
              <ResultBound key={row.strDrink} row={row} />
            ))}
          </>
        )}
      </ResultsStyled>
    </>
  );
}
