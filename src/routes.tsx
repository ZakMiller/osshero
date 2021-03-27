import { FC, lazy, Suspense } from "react";
import type { PartialRouteObject } from "react-router";
import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component: FC) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const Home = Loadable(lazy(() => import("./pages/Home")));

const routes: PartialRouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export default routes;
