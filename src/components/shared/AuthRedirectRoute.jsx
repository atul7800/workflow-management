import { Navigate } from "react-router-dom";
const AuthRedirectRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return isLoggedIn ? <Navigate to="/workflows" /> : children;
};

export default AuthRedirectRoute;
