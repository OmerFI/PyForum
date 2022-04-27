const DEBUG = false;

let BASE_URL = "";
if (DEBUG) {
  BASE_URL = "http://127.0.0.1:8000";
}

const Settings = () => {
  return { DEBUG, BASE_URL };
};

export default Settings;
