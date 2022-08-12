import { FC, ReactNode } from "react";
import { H1 } from "@ssr-tools/css/stylable/H1";
import { H2 } from "@ssr-tools/css/stylable/H2";

export const Header: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <H1
      css={{
        "&": {
          fontSize: 32,
          fontWeight: "300",
          letterSpacing: "2px",
        },
      }}
    >
      {children}
    </H1>
    <H2
      css={{
        "&": {
          fontSize: 12,
          borderBottom: "1px solid rgba(0,0,0,0.3)",
          marginBottom: 8,
          fontWeight: "300",
        },
      }}
    >
      template-with-fastify
    </H2>
  </>
);
