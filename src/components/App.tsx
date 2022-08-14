import { lazy, Suspense } from "react";
import { CurrentRoute } from "../config/router";
import { Layout } from "./Layout";
import { Navigation } from "./Navigation";

export const App = () => (
  <Layout>
    <Navigation />
    <Suspense fallback={<>Wait...</>}>
      <CurrentRoute fallbackComponent={LazyNotFound} />
    </Suspense>
  </Layout>
);

const LazyNotFound = lazy(() =>
  import("../pages/NotFound").then((i) => ({
    default: i.NotFound,
  }))
);
