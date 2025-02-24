import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import { Loader } from "rsuite";
import { RootState } from "@redux/store";
import Layout from "@components/Layout";

const StartPage = lazy(() => import("@pages/start"));
const GamePage = lazy(() => import("@pages/game"));
const AuthPage = lazy(() => import("@pages/auth"));
const AdminPage = lazy(() => import("@pages/admin"));

const AppRouter: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <Router>
      <Suspense fallback={<Loader center content="Загрузка..." />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route
              path="admin"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
