describe("Cocktails", () => {
  let innerText = "";

  beforeAll(async () => {
    await page.goto("http://localhost:9754/");
    innerText = await page.evaluate(() => document.body.textContent);
  });

  /*
   * DEFAULT STATE is {tags: {"Orange juice":"strIngredients"}}
   */

  it('on first load, page should be filtering by "Orange juice"', async () => {
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Orange Oasis");
  });

  it(`un-check "Orange juice" filter by clicking dropdown checkbox`, async () => {
    // click to see dropdown
    let focusOn = await page.evaluate(() =>
      document.querySelector("#filterByIngredients .label-input")
    );
    if (focusOn) {
      await focusOn.click();
    }
    // click to select option
    let clickOn = await page.evaluate(() =>
      document.querySelector("#filterByIngredients .options-dropdown .option:nth-child(4) input")
    );
    if (clickOn) {
      await clickOn.click();
    }
    // test
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Negroni");
  });

  it(`filter by ingredient "Orange juice" again`, async () => {
    let clickOn = await page.evaluate(() => document.querySelector("#filterBy .options-dropdown .option:nth-child(4) input"));
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Orange Oasis");
  });

  it(`un-check "Orange juice" filter by clicking its Tag "X"`, async () => {
    let clickOn = await page.evaluate(() => document.querySelector("#filterBy .tags .Tag"));
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Negroni");
  });

  it(`sort by name first click: ascending`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Apello");
  });

  it(`sort by name second click: descending`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Thai Iced Coffee");
  });

  it(`sort by name third click: back to unsorted`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
    await expect(title).toBe("Bora Bora");
  });
});
