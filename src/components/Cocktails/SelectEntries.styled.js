import styled from "styled-components";

export default styled.div`
  position: relative;
  display: inline-block;
  .label {
    border: solid 1px currentColor;
    border-radius: 5px;
    margin: 0 0.5rem 0 -1px;
    padding: 0.125rem 0.5rem 0.125rem 0.5rem;
    .icon {
      padding-left: 0.33rem;
    }
  }
  .options {
    position: absolute;
    left: 0;
    z-index: 100;
    background: white;
    display: flex;
    flex-direction: column;
    max-height: 0;
    box-sizing: border-box;
    overflow: auto;
    transition: max-height 0.5s;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    .option {
      display: block;
      margin: 0.5rem 0.25rem 0.75rem;
      min-width: 240px;
    }
  }
  &:hover {
    .options {
      max-height: 50vh;
    }
  }
`;
