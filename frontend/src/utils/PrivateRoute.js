import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  let { user } = useAuthContext();

  if (user) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
