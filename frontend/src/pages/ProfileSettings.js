import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import settings from "../Settings";

const ProfileSettings = () => {
  let api = useAxios();
  let { user } = useAuthContext();

  let [userData, setUserData] = useState(null);
  let [firstNameInputValue, setFirstNameInputValue] = useState("");
  let [lastNameInputValue, setLastNameInputValue] = useState("");

  let [profileUpdateSuccess, setProfileUpdateSuccess] = useState(null);
  let [profileImageUpdateSuccess, setProfileImageUpdateSuccess] =
    useState(null);

  const ChangeHandler = (e) => {
    let file = e.target.files[0];

    // Reference: https://stackoverflow.com/a/23633850/14892434
    let combining = /[\u0300-\u036F]/g;
    let filename = file.name.normalize("NFKD").replace(combining, "");
    // Reference: https://stackoverflow.com/a/20856346/14892434
    filename = filename.replace(/[^\x00-\x7F]/g, "");
    if (filename === "") {
      filename = "profile_image";
    }

    const formData = new FormData();
    formData.append("image", file, filename);

    api
      .put(`/api/profile/update/image/`, formData, {
        headers: {
          "Content-Disposition": `attachment; filename=${filename}`,
        },
      })
      .then((res) => {
        // Success
        console.log(res);
        setProfileImageUpdateSuccess(true);
        document.getElementById("profile-image").src =
          URL.createObjectURL(file);
        setTimeout(() => {
          setProfileImageUpdateSuccess(null);
        }, 3000);
        return res;
      })
      .catch((err) => {
        // Error
        if (err.message !== "Request aborted") {
          console.log(err);
        }
        setProfileImageUpdateSuccess(false);
        setTimeout(() => {
          setProfileImageUpdateSuccess(null);
        }, 3000);
        return err;
      });
  };

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
    GetProfile().then((res) => {
      setUserData(res.data);
      setFirstNameInputValue(res.data.first_name);
      setLastNameInputValue(res.data.last_name);
    });
  }, []);

  const UpdateProfile = async (first_name, last_name) => {
    let response = api
      .put(`/api/profile/update/`, { first_name, last_name })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("err", err);
        return err;
      });
    return response;
  };

  return (
    <div className="container">
      <div className="col-lg-8 mx-auto">
        <h1 className="mb-5">Profil Ayarları</h1>

        <form className="d-flex flex-column align-items-center justify-content-center mb-3">
          <img
            src={userData ? settings.BASE_URL + userData.image : null}
            alt=""
            className="rounded-circle mb-4"
            width={200}
            height={200}
            id="profile-image"
          />
          <input
            type="file"
            name="file"
            id="file"
            className="d-none"
            accept="image/jpeg,image/png"
            onChange={ChangeHandler}
          />
          {profileImageUpdateSuccess === true ? (
            <div className="alert alert-success" role="alert">
              Profil resmi başarıyla güncellendi.
            </div>
          ) : profileImageUpdateSuccess === false ? (
            <div className="alert alert-danger" role="alert">
              Profil resmi güncellenirken bir hata oluştu.
            </div>
          ) : null}

          <button
            type="button"
            className="btn btn-warning"
            onClick={() => document.getElementById("file").click()}
          >
            Profil Fotoğrafını Değiştir
          </button>
        </form>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            UpdateProfile(firstNameInputValue, lastNameInputValue).then(
              (res) => {
                if (res.status === 200) {
                  setProfileUpdateSuccess(true);
                  setTimeout(() => {
                    setProfileUpdateSuccess(null);
                  }, 2000);
                } else {
                  setProfileUpdateSuccess(false);
                  setTimeout(() => {
                    setProfileUpdateSuccess(false);
                  }, 2000);
                }
                return res;
              }
            );
          }}
        >
          <div className="col-12 mb-3">
            <label htmlFor="firstName">Kullanıcı Adı</label>
            <input
              type="text"
              id="disabledTextInput"
              className="form-control bg-dark text-white"
              disabled
              value={user.username}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="firstName">Adınız</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              required="required"
              value={firstNameInputValue}
              onChange={(e) => {
                setFirstNameInputValue(e.target.value);
              }}
            />
          </div>
          <div className="col-12 mb-3">
            <label htmlFor="lastName">Soyadınız</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              required="required"
              value={lastNameInputValue}
              onChange={(e) => {
                setLastNameInputValue(e.target.value);
              }}
            />
          </div>

          {profileUpdateSuccess === true ? (
            <div className="alert alert-success" role="alert">
              Profiliniz başarıyla güncellendi.
            </div>
          ) : profileUpdateSuccess === false ? (
            <div className="alert alert-danger" role="alert">
              Profiliniz güncellenirken bir hata oluştu.
            </div>
          ) : null}

          <div className="col-12 mt-5 mb-3 text-center">
            <button className="btn btn-info">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
