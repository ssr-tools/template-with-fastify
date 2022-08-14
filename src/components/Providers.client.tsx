import { StyleCacheProvider } from "@ssr-tools/css/components/StyleCacheProvider";
import { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { FallbackProps } from "react-error-boundary";
import { RouterProvider } from "../config/router";
import { ErrorOccurred } from "../pages/ErrorOccurred";

export const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <StyleCacheProvider>
      <RouterProvider
        initialHash={window.location.hash}
        initialPathname={window.location.pathname}
        initialSearch={window.location.search}
      >
        {children}
      </RouterProvider>
    </StyleCacheProvider>
  </ErrorBoundary>
);

const FallbackComponent: FC<FallbackProps> = ({ error }) => (
  <ErrorOccurred error={error} />
);
