import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(CurrentUserContext);

  // If the user is not logged in, redirect to the login page
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the children components
  return children;
};
