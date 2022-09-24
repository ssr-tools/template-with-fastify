import { goToPage } from "../../test-utils/goToPage";

test("navigates from the home page to the about page", async () => {
  await goToPage(new URL("/", "http://localhost:8080"));
  expect(await getH1Text()).toEqual("Hello world");
  await page.click("a[href='/about'");
  await page.waitForTimeout(50);
  expect(await getH1Text()).toEqual("About page");
});

test("navigates from the about page to the home page", async () => {
  await goToPage(new URL("/about", "http://localhost:8080"));
  expect(await getH1Text()).toEqual("About page");
  await page.click("a[href='/'");
  await page.waitForTimeout(50);
  expect(await getH1Text()).toEqual("Hello world");
});

test("renders not found page", async () => {
  await goToPage(new URL("/123456789", "http://localhost:8080"));
  expect(await getH1Text()).toEqual("Page not found!");
});

const getH1Text = () =>
  page.evaluate(() => document.querySelector("h1")?.textContent);
