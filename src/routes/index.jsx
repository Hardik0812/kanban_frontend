import { Suspense } from "react";
import NotFound from "../pages/NotFound";
import authRoutes from "./authRoutes";
import dashboardRoutes from "./dashboardRoutes";

const routes = [
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
