# Discover new cocktails. Browse by ingredients or tags.

### https://cocktails.paulshorey.com

(deployed to Vercel)

# Background

This was based on my previous React experiment, which I used to practice NextJS server-side-generated dynamic routes and functional testing. That one uses HTTP calls to the awesome [dog.ceo](https://dog.ceo) API. Check it out: https://dogs.paulshorey.com

## Todo:

* pagination (or infinite scroll)
* more testing (barely started)
* more features (user-specify which columns to show/hide)

## Testing:

This uses my experimental end-to-end testing framework, run by Jest + Pupeeteer. It's more useful (compared to traditional unit tests) in more complex projects, like my https://dogs.paulshorey.com, which has server-side-rendering of a lot of data from many API endpoints. However, I thought it would be interesting to include here as well.

### Do **`npm run test`** when adding/editing tests

**When developing the app, just `git commit` the changes.** Testing is integrated into the CI process. The tests will automatically run. If the tests fail, the commit will also fail.

1. First, the script runs **lint**, **build**, then starts serving the app at port **:9754**.
2. Then it runs tests using `jest --verbose`. Jest can be configured in `jest.config.js`
3. Whether tests succeed or fail, the ":9754" server is stopped, so it be started again next time.
4. If any tests fail (including the initial `lint`), you will see instructions about what needs to be fixed. If this was triggered by a `git commit`, it will not be allowed to execute until you fix the tests and run `git commit` again.

This uses "husky" to add "pre-commit" or other hooks:

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

> **tests are not finished (just started)**
