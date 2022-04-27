import jwt_decode from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useAuthContext } from "../context/AuthContext";
import Settings from "../Settings";

const baseURL = Settings().BASE_URL;

const useAxios = () => {
  let { authTokens, setUser, setAuthTokens } = useAuthContext();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: authTokens ? `Bearer ${authTokens.access}` : null,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // dayjs(user.exp * 1000).isBefore(dayjs());

    if (!isExpired) {
      return req;
    }

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authTokens.refresh,
    });

    authTokens = response.data;
    localStorage.setItem("authTokens", JSON.stringify(authTokens));

    setAuthTokens(authTokens);
    setUser(jwt_decode(authTokens.access));

    req.headers.Authorization = authTokens
      ? `Bearer ${authTokens.access}`
      : null;

    return req;
  });

  return axiosInstance;
};

export const useAnonimAxios = () => {
  const axiosInstance = axios.create({
    baseURL,
  });

  return axiosInstance;
};

export default useAxios;
