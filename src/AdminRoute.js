import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
