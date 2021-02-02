import styled from "styled-components";

export default styled.span`
  cursor: pointer;
  color: hsla(0, 0%, 60%);
  display: inline-block;
  padding: 0 0.1rem 0.3rem 0;
  white-space: nowrap;
  &:hover,
  &.active {
    color: orange;
    .value {
      text-decoration: none;
    }
  }
  > * {
    display: inline-block;
  }
  .value {
    text-decoration: underline;
  }
  &:last-child .comma {
    display: none;
  }
`;
