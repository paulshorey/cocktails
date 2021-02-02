import styled from "styled-components";

export default styled.section`
  clear: both;
  break-inside: avoid;
  padding: 0 0.5rem 0 0;
  display: grid;
  grid-template-columns: 1fr 2fr 4fr;
  align-items: center;
  .title {
    padding: 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .image {
    border-radius: 5px;
    box-shadow: 0 1px hsla(0, 0%, 79%);
  }
  p {
    text-align: center;
    padding: 0.5rem;
  }
`;
