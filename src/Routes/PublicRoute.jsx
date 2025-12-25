import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { isAuth } = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/app" replace />;
};


export default PublicRoute;
