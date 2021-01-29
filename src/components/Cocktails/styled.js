import styled from "styled-components";

export const Tag = styled.span`
  display: inline-flex;
  border-radius: 5px;
  white-space: nowrap;
  margin: 0 0.5rem 0.25rem 0;
  font-size: 0.85rem;
  padding: 0;
  cursor: pointer;
  background-color: hsla(0, 0%, 95%);
  background-image: linear-gradient(to bottom, hsla(0, 0%, 99%), hsla(0, 0%, 89%));
  box-shadow: inset 0 1px hsla(0, 0%, 89%);
  &:hover {
    background-image: linear-gradient(to top, hsla(0, 0%, 99%), hsla(0, 0%, 89%));
    box-shadow: inset 0 -1px hsla(0, 0%, 89%);
  }
  &.active {
    background-color: hsla(90, 70%, 84%);
    background-image: linear-gradient(to bottom, hsla(90, 70%, 89%), hsla(90, 70%, 79%));
    &:hover {
      background-image: linear-gradient(to top, hsla(90, 70%, 89%), hsla(90, 70%, 79%));
    }
  }
  > * {
    display: inline-block;
  }
  .value {
    flex-grow: 1;
    padding: 0.25rem 0.3rem 0.25rem 0.5rem;
  }
  .icon {
    font-weight: bold;
    font-size: 1rem;
    line-height: 0.88rem;
    text-shadow: 1px 1px white;
    opacity: 0.5;
    padding: 0.25rem 0.5rem 0.25rem 0.1rem;
  }
`;
export const Table = styled.div`
  img {
    border-radius: 5px;
    box-shadow: 0 1px hsla(0, 0%, 79%);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 2fr 1fr 6fr;
    margin-top: 0.75rem;
    @media (max-width: 700px) {
      display: block;
      .th .top_label {
        visibility: hidden;
      }
      // display td content as compact as possible
      > * {
        display: inline-block;
        &.colType_strDrink {
          padding-left: 0;
        }
        &.colType_image {
          float: left;
          margin-right: 0.5rem;
        }
        &.colType_list:last-child {
          display: inline;
        }
        &.colType_strAlcoholic {
          display: none;
        }
      }
      // clearfix - because image is now floated
      ::after {
        content: "";
        clear: both;
        display: block;
      }
    }
    &.row_th {
      margin-top: 0;
      margin-bottom: 0.75rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      position: sticky;
      top: 0;
      z-index: 100;
      background: hsl(39deg 96% 48%);
    }
  }
  .th {
    text-align: left;
    font-weight: 600;
    text-transform: capitalize;
    color: white;
    cursor: pointer;
    .top_logo {
      white-space: nowrap;
    }
    .top_etc {
      position: absolute;
      right: 0.5rem;
      white-space: nowrap;
    }
    a {
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .td {
    &.colType_key {
      white-space: nowrap;
      max-width: 40rem;
      text-overflow: ellipsis;
    }
  }
  .th,
  .td {
    padding-left: 0.5rem;
    &.colType_strDrink {
      font-weight: 600;
    }
  }

  @media (max-width: 700px) {
    .hide-small {
      display: none;
    }
  }
`;
