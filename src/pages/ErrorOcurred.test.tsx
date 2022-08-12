import { StyleCacheProvider } from "@ssr-tools/css/components/StyleCacheProvider";
import { act } from "react-dom/test-utils";
import { mountRoot } from "../../test-utils/mountRoot";
import { ErrorOccured } from "./ErrorOccured";

test("renders error message if error is instance of Error", async () => {
  const { root, cleanUp } = mountRoot();

  act(() => {
    root.render(
      <StyleCacheProvider>
        <ErrorOccured error={new Error("Test error message")} />
      </StyleCacheProvider>
    );
  });

  expect(document.querySelector("p")?.textContent).toBe("Test error message");

  cleanUp();
});

test('renders "Unknown error" if error is NOT instance of Error', async () => {
  const { root, cleanUp } = mountRoot();

  act(() => {
    root.render(
      <StyleCacheProvider>
        <ErrorOccured error={"Just string"} />
      </StyleCacheProvider>
    );
  });

  expect(document.querySelector("p")?.textContent).toBe("Unknown error");

  cleanUp();
});
