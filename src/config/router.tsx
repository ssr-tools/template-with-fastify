import { createRouter } from "@ssr-tools/router/createRouter";
import { lazy } from "react";

const router = createRouter({
  "/": {
    component: lazy(() =>
      import("../pages/Home").then((i) => ({
        default: i.Home,
      }))
    ),
    allowSuffix: false,
  },
  "/about": {
    component: lazy(() =>
      import("../pages/About").then((i) => ({
        default: i.About,
      }))
    ),
    allowSuffix: false,
  },
});

export const {
  RouterProvider,
  CurrentRoute,
  A,
  buildHref,
  usePathParam,
  useSearchParam,
  useCurrentPathPattern,
  usePush,
  useReplace,
} = router;
