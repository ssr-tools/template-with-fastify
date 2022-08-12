import { StyleCacheProvider } from "@ssr-tools/css/components/StyleCacheProvider";
import { FC, ReactNode } from "react";
import { RouterProvider } from "../config/router";

export const Providers: FC<{ children: ReactNode; url: URL }> = ({
  children,
  url,
}) => (
  <StyleCacheProvider>
    <RouterProvider
      initialHash={url.hash}
      initialPathname={url.pathname}
      initialSearch={url.search}
    >
      {children}
    </RouterProvider>
  </StyleCacheProvider>
);
