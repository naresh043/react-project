import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const isAuth = useSelector((state) => state.userAuth);
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
