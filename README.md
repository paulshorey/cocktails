# Discover new cocktails. Browse by ingredients or tags.

### Visit: https://cocktails.paulshorey.com

## Todo:

- pagination (or infinite scroll)
- fix git hooks

## Quirks:

- Uses an unusual architecture for one of the components. See **`src/components/Cocktails`**. [ABOUT.md](src/components/Cocktails/ABOUT.md)
- Data is imported from a SQL backup, into a purely Front-End JavaScript "in-browser database" [alasql](https://github.com/agershun/alasql). You can query it using standard SQL. See the abstraction in: **`src/data/cocktails.js`** line 100.

## Testing:

This uses a new end-to-end testing technique, run by Jest + Pupeeteer. It's more useful (compared to traditional unit tests) for more complex projects like my https://dogs.paulshorey.com, which gets a lot of data from many API data, and server-side-renders them into dynamic route urls. However, I thought it would be beneficial to include it here as well. End-to-end tests are very fast to write and have the benefit of testing the app exactly as the visitor will see it.

### Do **`npm run test`** when adding/editing tests

**When developing the app, just `git commit` the changes.** Testing is integrated into the CI process. The tests will automatically run. If the tests fail, the commit will also fail.

1. First, the script runs **lint**, **build**, then starts serving the app at port **:9754**.
2. Then it runs tests using `jest --verbose`. Jest can be configured in `jest.config.js`
3. Whether tests succeed or fail, the ":9754" server is stopped, so it be started again next time.
4. If any tests fail (including the initial `lint`), you will see instructions about what needs to be fixed. If this was triggered by a `git commit`, it will not be allowed to execute until you fix the tests and run `git commit` again.

**This uses "husky" to add "pre-commit" or other hooks:**

```
"husky": {
  "hooks": {
    "pre-commit": "npm run test"
  }
},
"test": "npm run lint && npm run build && npm run test_start_server && npm run test_run_tests && npm run test_stop_server",
```

Helper scripts used by `npm run test`:

```
"test_start_server": "next start -p 9754 &",
"test_run_tests": "jest --verbose || npm run test_stop_server",
"test_stop_server": "kill -9 $(lsof -i TCP:9754 | grep LISTEN | awk '{print $2}')"
```
