import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import RefreshPage from "../utils/Page";
import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import settings from "../Settings";

const HeaderUserDetail = () => {
  const { logoutUser, user } = useAuthContext();
  let [userData, setUserData] = useState(null);
  let api = useAxios();

  let isAuthenticated = user ? true : false;
  let content;

  const GetProfile = async () => {
    let response = api
      .get(`/api/profile/${user.user_id}/`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err.message !== "Request aborted") {
          console.log(err);
        }
        return err;
      });
    return response;
  };

  useEffect(() => {
    if (user) {
      GetProfile().then((res) => {
        setUserData(res.data);
      });
    }
  }, []);

  if (isAuthenticated) {
    content = (
      <div className="dropdown text-end">
        <Link
          to="#"
          className="d-block link-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={userData ? settings.BASE_URL + userData.image : ""}
            width="32"
            height="32"
            className="rounded-circle"
          />
        </Link>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link
              className="dropdown-item"
              to="#"
              onClick={() => {
                document
                  .querySelector('button[data-bs-target="#createPostModal"]')
                  .click();
              }}
            >
              Yeni Gönderi...
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/profile/settings">
              Ayarlar
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item"
              to={user ? `/profile/${user.user_id}` : "#"}
            >
              Profil
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link
              className="dropdown-item"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                logoutUser();
                RefreshPage();
              }}
            >
              Çıkış yap
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    content = (
      <div className="text-end">
        <div className="buttons">
          <button
            className="btn me-2 btn-outline-light"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Giriş Yap
          </button>
          <button
            className="btn btn-info"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Kaydol
          </button>
        </div>

        <LoginModal />
        <RegisterModal />
      </div>
    );
  }

  return content;
};

export default HeaderUserDetail;
