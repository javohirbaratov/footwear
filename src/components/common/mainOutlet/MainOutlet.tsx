import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { Error500 } from "../../../pages";
import PageLoading from "../../../pages/errors/loading/PageLoading";

const MainOutlet: React.FC = () => {
  return (
    <ErrorBoundary fallback={<Error500 />}>
      <Suspense fallback={<PageLoading />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MainOutlet;
