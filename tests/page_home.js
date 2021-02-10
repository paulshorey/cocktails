const fsOriginal = require("fs");
const fs = fsOriginal.promises;
const SELF_DIR = "tests/";
const TMP_DIR = SELF_DIR + "screenshots";
fs_setup();
const usePort = process.env.USE_PORT || "3004";

/*
 * Test
 */
describe("Cocktails page", () => {
  /*
   * Setup
   */
  let sn = 0; // screenshot number
  let innerText = ""; // update innerText after loading new page
  beforeAll(async () => {
    await page.goto(`http://localhost:${usePort}/`);
    innerText = await page.evaluate(() => document.body.textContent);
    // debug screenshot
    await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} initial load.png` });
  });

  /*
   * Crawl
   */
  {
    let test = it('on first load, page should be filtering by "Orange juice"', async () => {
      // DEFAULT STATE IS {tags: {"Orange juice":"strIngredients"}}
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Orange Oasis");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it(`un-check "Orange juice" filter by clicking dropdown checkbox`, async () => {
      // interact
      await page.click('#filterByIngredients .options-dropdown .option:nth-child(4) input');
      // test
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Negroni");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it(`filter by ingredient "Orange juice" again`, async () => {
      // interact
      await page.click('#filterByIngredients .options-dropdown .option:nth-child(4) input');
      // test
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Orange Oasis");
    });
  }
  {
    let test = it(`un-check "Orange juice" filter by clicking its Tag "X"`, async () => {
      // interact
      await page.click('#filterBy .tags .Tag');
      // test
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Negroni");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it(`sort by name first click: ascending`, async () => {
      const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
      if (clickOn) {
        await clickOn.click();
      }
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Apello");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it(`sort by name second click: descending`, async () => {
      const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
      if (clickOn) {
        await clickOn.click();
      }
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Thai Iced Coffee");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
  {
    let test = it(`sort by name third click: back to unsorted`, async () => {
      const [clickOn] = await page.$x(`//*[@id="sortBy"]/*[contains(., 'name')]`);
      if (clickOn) {
        await clickOn.click();
      }
      let title = await page.evaluate(() => document.querySelector(".Result:nth-child(4) .title").innerText);
      await expect(title).toBe("Bora Bora");
      // debug screenshot
      await page.screenshot({ path: SELF_DIR + `screenshots/${sn++} ${test.description}.png` });
    });
  }
});


/*
 * LIB
 */
async function click_and_wait(page, selector) {
  return new Promise(async (resolve) => {
    try {
      let response = await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click(selector) // Clicking the link will indirectly cause a navigation
      ]);
      resolve(response);
    } catch (e) {
      console.error(e);
      resolve(false);
    }
  });
}

async function fs_setup() {
  await fs.rmdir(TMP_DIR, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
    console.log(`rm ${TMP_DIR}`);
  });
  await fs.mkdir(TMP_DIR);
}
