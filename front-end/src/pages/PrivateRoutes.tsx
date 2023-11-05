import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoutes = () => {
  const {user} = useContext(AuthContext);
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoutes;
