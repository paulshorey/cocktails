import styled from "styled-components";

export default styled.div`
  position: relative;
  border: solid 1px lightgrey;
  border-radius: 2px;
  display: inline-flex;
  flex-direction: row-reverse;
  .label {
    input[type="text"] {
      width: 100%;
    }
    input[type="checkbox"],
    input[type="radio"] {
      margin-right: 0.5rem;
    }
    .label-input {
      border: none;
      padding: 0.33rem 0.5rem 0.33rem 0.67rem;
    }
    .icon {
      position: absolute;
      right: 0.4rem;
      top: 0.2rem;
      pointer-events: none;
    }
    .options-dropdown {
      position: absolute;
      left: 0;
      z-index: 100;
      background: white;
      display: flex;
      flex-direction: column;
      max-height: 0;
      box-sizing: border-box;
      overflow: auto;
      transition: max-height 0.3s, padding 0.3s;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
      padding: 0 0.25rem;
      &.opened {
        max-height: 50vh;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .option {
        display: block;
        margin: 0.5rem 0.25rem;
        min-width: 240px;
      }
    }
  }
`;
