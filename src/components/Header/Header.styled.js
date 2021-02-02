import styled from "styled-components";

export default styled.header`
  margin-top: 0;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  background: hsl(40deg 95% 50%);
  text-align: left;
  font-weight: 600;
  text-transform: capitalize;
  color: white;
  column-count: 3;
  display: flex;
  flex-direction: column;
  > * {
    cursor: pointer;
  }
  .top_logo {
    white-space: nowrap;
  }
  .top_etc {
    float: right;
    white-space: nowrap;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
