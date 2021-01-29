async function click_and_wait(page, selector) {
  return new Promise(async (resolve) => {
    try {
      let response = await Promise.all([
        page.waitFor(2000),
        // page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click(selector) // Clicking the link will indirectly cause a navigation
      ]);
      resolve(response);
    } catch (e) {
      console.error(e);
      resolve(false);
    }
  });
}

describe("Home page", () => {
  let innerText = "";

  beforeAll(async () => {
    await page.goto("http://localhost:9754/");
    innerText = await page.evaluate(() => document.body.textContent);
  });

  it('should be titled "Cocktail Recipes"', async () => {
    await expect(page.title()).resolves.toMatch("Cocktail Recipes");
  });

  it("should contain Negroni", async () => {
    expect(innerText).toContain("Negroni");
  });

  it("should contain Campari", async () => {
    expect(innerText).toContain("Campari");
  });

  // it("should go to breed page when clicked", async () => {
  //   // click and wait to load next page
  //   await click_and_wait(page, "main section article:nth-child(4) h3");
  //   // ok, page loaded
  //   innerText = await page.evaluate(() => document.body.textContent);
  //   // expect(innerText).toContain('curly retriever')
  //   expect(innerText).toContain("back to all dogs");
  // });

  // it("should go to sub-breed page when clicked", async () => {
  //   // click and wait to load next page
  //   await click_and_wait(page, "main h3");
  //   // ok, page loaded
  //   innerText = await page.evaluate(() => document.body.textContent);
  //   expect(innerText).toContain("back to all dogs");
  // });
});
