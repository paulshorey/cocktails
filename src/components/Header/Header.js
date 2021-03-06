import HeaderStyled from "./Header.styled";
export default function () {
  return (
    <HeaderStyled>
      <div className="content">
        {/* text before first cell */}
        <span className="top_logo">
          <span className="icon-cocktail-solid" />
          <a href="https://www.thecocktaildb.com/" target="_blank">
            {" "}
            Cocktails DB
          </a>
        </span>
        {/* text after last cell */}
        <a className="top_etc" href="https://github.com/paulshorey/cocktails" target="_blank">
          <span className="icon-code-regular hide-small" /> <span className="icon-github" />
        </a>
      </div>
    </HeaderStyled>
  );
}
