const getAuthTokens = () => {
  let authTokens = localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null;
  return authTokens;
};

export default getAuthTokens;
