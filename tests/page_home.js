describe("Cocktails", () => {
  let innerText = "";

  beforeAll(async () => {
    await page.goto("http://localhost:9754/");
    innerText = await page.evaluate(() => document.body.textContent);
  });

  it('by default, 4th item should be Negroni', async () => {
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Negroni");
  });

  it(`filter by ingredients`, async () => {
    const [clickOn] = await page.$x(`//*[@id="filterByIngredients"]/*[contains(., 'Amaretto')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Amaretto Mist");
  });

  it(`filter by ingredients - click again to reset`, async () => {
    const [clickOn] = await page.$x(`//*[@id="filterByIngredients"]/*[contains(., 'Amaretto')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Negroni");
  });

  it(`filter by tag: New Era Drinks`, async () => {
    const [clickOn] = await page.$x(`//*[@id="filterByTags"]/*[contains(., 'New Era Drinks')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Dirty Martini");
  });

  it(`filter by tag: Non alcoholic`, async () => {
    const [clickOn] = await page.$x(`//*[@id="filterByTags"]/*[contains(., 'Non alcoholic')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Bora Bora");
  });

  it(`sort by name first click: ascending`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Apello");
  });

  it(`sort by name second click: descending`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Thai Iced Coffee");
  });

  it(`sort by name third click: back to unsorted`, async () => {
    const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
    if (clickOn) {
      await clickOn.click();
    }
    let title = await page.evaluate(() => document.querySelector('.Result:nth-child(4) .title').innerText );
    await expect(title).toBe("Bora Bora");
  });

});
