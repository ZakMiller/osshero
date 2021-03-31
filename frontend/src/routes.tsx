import React, { FC, lazy, Suspense } from "react";
import type { PartialRouteObject } from "react-router";
import LoadingScreen from "./components/LoadingScreen";
import Layout from "./components/Layout";
const Loadable = (Component: FC) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const Leaderboard = Loadable(lazy(() => import("./pages/Leaderboard")));
const Profile = Loadable(lazy(() => import("./pages/Profile")));
const ProfileSearch = Loadable(lazy(() => import("./pages/ProfileSearch")));

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
        path: "/profile",
        element: <ProfileSearch />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
];

export default routes;
