# About this "Cocktails" component:

## The entire folder is treated as one component.

It starts with `index.js`.

Every other component in this folder is as if it is part of that same component.

## Usage:

**1** - Import "components" in the same folder as you would with any other compoenent.

**2** - **"bind"** the imported component to the current component

**Like this:**

```
  render() {
    const FiltersBound = Filters.bind(this);
    const ResultsBound = Results.bind(this);
    return (
      <>
        <FiltersBound />
        <ResultsBound />
      </>
    );
  }
```

**This way, the imported component can call `this.state` or `this.props` or `this.someMethod()` of the parent.** So, all components in this folder can be treated as simply and easily as one component. No passing many props back and forth. No need to pass everything through Redux. But also, unlike working with a giant single component, this is organized and easy to read! 

## Why?

Because it works well, without having to pass 100 different props or passing everything through Redux.


