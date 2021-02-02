import styled from "styled-components";

export default styled.article`
  padding: 0.75rem 0;
  overflow: auto;
  column-count: 3;
  column-fill: balance;
  > * {
    break-inside: avoid;
    margin-bottom: 0.75rem;
  }
`;
