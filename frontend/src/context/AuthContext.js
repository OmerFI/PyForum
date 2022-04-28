import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

import getAuthTokens from "../utils/AuthTokens";
import RefreshPage from "../utils/Page";
import { useNavigate } from "react-router-dom";
import Settings from "../Settings";

const AuthContext = React.createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(getAuthTokens);
  let [user, setUser] = useState(() => {
    return authTokens ? jwt_decode(localStorage.getItem("authTokens")) : null;
  });
  let [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  let loginUser = async (username, password) => {
    let response = await axios
      .post(Settings().BASE_URL + "/api/token/", {
        username,
        password,
      })
      .then((response) => {
        const data = response.data;
        if (response.status === 200) {
          setAuthTokens(data);
          setUser(jwt_decode(data.access));
          localStorage.setItem("authTokens", JSON.stringify(data));
          // RefreshPage();
        }
        return response;
      })
      .catch((error) => {
        return error.toJSON();
      });
    return response;
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  let registerUser = async (username, email, password) => {
    let response = await axios
      .post(Settings().BASE_URL + "/api/users/register/", {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 201) {
          // loginUser(username, password);
          loginUser(username, password).then((response) => {
            if (response.status === 200) {
              navigate("/profile/settings");
              RefreshPage();
            }
          });
        }
        return response;
      })
      .catch((error) => {
        let errorJSON = error.toJSON();
        errorJSON.data = error.response.data;
        return errorJSON;
      });
    return response;
  };

  let contextData = {
    user,
    authTokens,

    loginUser,
    logoutUser,
    registerUser,

    setAuthTokens,
    setUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
