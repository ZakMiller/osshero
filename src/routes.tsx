import { FC, lazy, Suspense } from "react";
import type { PartialRouteObject } from "react-router";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
const Loadable = (Component: FC) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const Leaderboard = Loadable(lazy(() => import("./pages/Leaderboard")));
const Contributions = Loadable(lazy(() => import("./pages/Contributions")));

const routes: PartialRouteObject[] = [
  {
    path: "*",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Leaderboard />,
      },
      {
        path: "/contributions",
        element: <Contributions />,
      },
    ],
  },
];

export default routes;
