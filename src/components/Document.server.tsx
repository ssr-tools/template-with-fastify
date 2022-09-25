import { FC, ReactNode } from "react";
import { Fonts } from "./Fonts.server";

export const Document: FC<{
  children: ReactNode;
}> = ({ children }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>template-with-fastify</title>
      <meta
        name="description"
        content={
          "This is a really simple project. It shows the usage of" +
          " ssr-tools combined with fastify."
        }
      />
      <Fonts.Preconnect />
    </head>
    <body>
      <div id="root">{children}</div>
      <Fonts.Style />
    </body>
  </html>
);
