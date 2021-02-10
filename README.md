# Discover new cocktails. Browse by ingredients or tags.

### Visit: https://cocktails.paulshorey.com

## Todo:

- pagination (or infinite scroll)
- fix git hooks

## Quirks:

- Uses an unusual architecture for one of the components. See **`src/components/Cocktails`**. [ABOUT.md](src/components/Cocktails/ABOUT.md)
- Data is imported from a SQL backup, into a purely Front-End JavaScript "in-browser database" [alasql](https://github.com/agershun/alasql). You can query it using standard SQL. See the abstraction in: **`src/data/cocktails.js`** line 100.

## Testing :

This project uses NextJS infrastructure and a lot of server-side-generated content. Unit tests would be a big pain to set up. What's much easier and actually more effective? Try "end-to-end testing", also called "functional testing". Use "Puppeteer" (a programmable Chrome browser) to check that all important content has been generated correctly and all important user-interactions are working.

> No more spending hours mocking data sources. Nothing to mock at all. It's real - same content the user will see. This "puppeteer" powered "functional testing" runs just as reliably and almost as quickly as traditional unit tests.

### npm run test

**When developing the app, just `git commit` the changes.** Testing is integrated into the CI process. The tests will automatically run. If the tests fail, the commit will also fail.

> Step 1) Runs **lint**, **build**, and **serve** the app.
> Step 2) Runs tests using `jest --verbose`.
> Step 3) Whether tests succeed or fail, the server is stopped, so it will not block future processes.
> Step 4) If any tests fail (including the initial `lint`), you will see instructions about what needs to be fixed. If this was triggered by a `git commit`, you will not be allowed to push changes until you fix the tests and run `git commit` again.

### Pre-commit hook:

This uses "husky" to add "pre-commit" or other hooks to your "git commit" command:

```
"husky": {
  "hooks": {
    "pre-commit": "npm run test"
  }
},
```
