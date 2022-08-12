import { FC, ReactNode } from "react";
import { Div } from "@ssr-tools/css/stylable/Div";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <Div
    css={{
      "*": {
        margin: 0,
        padding: 0,
        fontFamily: "'Lato', sans-serif;",
      },
      "&": {
        display: "flex",
        padding: 4,
      },
      "& > div": {
        maxWidth: "80ch",
        width: "100%",
        margin: "auto",
        padding: 0,
      },
    }}
  >
    <div>{children}</div>
  </Div>
);
