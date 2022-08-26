const DEBUG = process.env.REACT_APP_DEBUG || true;

let BASE_URL = process.env.REACT_APP_BASE_URL || "";
if (DEBUG) {
  BASE_URL = "http://127.0.0.1:8000";
}

const Settings = () => {
  return { DEBUG, BASE_URL };
};

export default Settings;
