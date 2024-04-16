import { lazy, Suspense } from "react";

import Loading from "../components/Loading";
import AuthGuard from "../utils/AuthGuard";
import CommonLayout from "../layout/CommonLayout";
import ProjectList from "../pages/ProjectList";

const Dashboard = lazy(() => import("../pages/Dashboard"));

const authRoutes = [
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthGuard>
          <CommonLayout>
            <Dashboard />
          </CommonLayout>
        </AuthGuard>
      </Suspense>
    ),
  },
  {
    path: "/project",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthGuard>
          <CommonLayout>
            <ProjectList />
          </CommonLayout>
        </AuthGuard>
      </Suspense>
    ),
  },
];

export default authRoutes;
