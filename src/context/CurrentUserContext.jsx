import React, { useState, useEffect } from "react";
import { checkToken, signin, signup, updateProfile } from "../utils/auth"; // We'll use this to verify the token

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if there's a token in localStorage when the app loads
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      // If there's a token, verify it with the server
      checkToken(jwt)
        .then((data) => {
          setCurrentUser(data); // Set the user data if token is valid
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt"); // Remove invalid token
        });
    }
  }, []);

  // These methods will be available throughout your app via context

  const handleLoginToSignUp = () => {
    closeModal();
    openModal("login");
  };

  const handleSignUpToLogin = () => {
    closeModal();
    openModal("signup");
  };

  const handleLogin = (email, password) => {
    return signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        // After saving token, check it to get user data
        return checkToken(data.token); // This should return user data
      })
      .then((userData) => {
        console.log("User data received:", userData); // Let's add this log to debug
        setCurrentUser(userData);
        return userData;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleSignup = (userData) => {
    return signup(userData)
      .then((data) => {
        return signin({
          email: userData.email,
          password: userData.password,
        })
          .then((signinData) => {
            localStorage.setItem("jwt", signinData.token);
            return checkToken(signinData.token);
          })
          .then((userData) => {
            setCurrentUser(userData);
            return userData;
          });
      })
      .catch((err) => {
        console.log("Context: Signup error:", err);
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
  };

  const handleProfileUpdate = (name, avatar) => {
    const jwt = localStorage.getItem("jwt");
    return updateProfile(name, avatar, jwt)
      .then((data) => {
        setCurrentUser(data);
        return data;
      })
      .catch((err) => {
        console.log("Context: Profile update error:", err);
        throw err;
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleLogin,
        handleLogout,
        handleSignup,
        handleProfileUpdate,
        handleLoginToSignUp,
        handleSignUpToLogin,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
