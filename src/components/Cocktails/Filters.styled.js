import styled from "styled-components";

export default styled.nav`
  border-bottom: solid 1px #cccccc;
  padding: 0.125rem 1px 0.5rem 1px;
  margin: 0.25rem 0;
  .filter {
    display: inline-block;
    vertical-align: middle;
    margin: 0.25rem 1.25rem 0.25rem 0;
    > * {
      vertical-align: middle;
    }
    .Tag {
      padding-bottom: 0;
      &:last-child {
        padding-right: 0;
      }
    }
  }
  .selectors {
    display: inline-flex; // for vertical alignment, because inline-block collapses content outside of self
    margin: 0 1rem 0 0;
  }
  .tags {
    margin: 0 0.5rem 0.125rem 0;
    .x {
      display: inline-block;
    }
  }
  .SelectEntries {
    margin: 0 0.25rem;
  }
`;
