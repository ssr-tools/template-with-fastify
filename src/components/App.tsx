import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { CurrentRoute } from "../config/router";
import { Layout } from "./Layout";
import { Navigation } from "./Navigation";

export const App = () => (
  <ErrorBoundary FallbackComponent={LazyErrorOccured}>
    <Layout>
      <Navigation />
      <Suspense fallback={<>Wait...</>}>
        <CurrentRoute fallbackComponent={LazyNotFound} />
      </Suspense>
    </Layout>
  </ErrorBoundary>
);

const LazyNotFound = lazy(() =>
  import("../pages/NotFound").then((i) => ({
    default: i.NotFound,
  }))
);

const LazyErrorOccured = lazy(() =>
  import("../pages/ErrorOccured").then((i) => ({
    default: i.ErrorOccured,
  }))
);
