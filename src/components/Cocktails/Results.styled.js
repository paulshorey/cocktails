import styled from "styled-components";

export default styled.article`
  padding: 0.75rem 0;
  overflow: auto;
  column-fill: balance;
  column-count: 3;
  @media (max-width:1100px) {
    column-count: 2;
  }
  @media (max-width:650px) {
    column-count: 1;
  }
  > * {
    break-inside: avoid;
    margin-bottom: 0.75rem;
  }
`;
