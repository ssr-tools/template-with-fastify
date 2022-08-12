import { FC, ReactNode } from "react";
import { P } from "@ssr-tools/css/stylable/P";

export const Paragraph: FC<{ children: ReactNode }> = ({ children }) => (
  <P
    css={{
      "&": {
        margin: "4px 0",
        color: "rgba(0,0,0,.85)",
      },
      "& a": {
        color: "rgba(0,0,0,0.85)",
        fontWeight: "300",
      },
    }}
  >
    {children}
  </P>
);
