import { useParams } from "react-router-dom";
import { useAnonimAxios } from "../utils/useAxios";
import { useState, useEffect } from "react";
import settings from "../Settings";
import PostPreview from "../components/PostPreview";

const Profile = () => {
  const { profileId } = useParams();
  let [userData, setUserData] = useState(null);

  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get(`/api/profile/${profileId}/`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        if (err.message === "Request aborted") {
          return;
        }
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className="col-lg-8 mx-auto">
        <h1 className="mb-5 text-center">
          {/* {userData ? userData.username : ""} Kullanıcısının Profili */}
          {userData ? userData.username : ""}
        </h1>

        <div className="d-flex flex-column align-items-center justify-content-center mb-3">
          <img
            src={userData ? settings.BASE_URL + userData.image : null}
            alt=""
            className="rounded-circle mb-4"
            width={200}
            height={200}
            id="profile-image"
          />

          <p>{userData ? userData.full_name : ""}</p>
        </div>

        <div className="category-posts pt-3">
          <h2 className="mb-4">Gönderiler</h2>
          <div className="shadow">
            {userData && userData.posts.length === 0 ? (
              <div className="text-left">
                <small className="text-white-50">
                  Daha önce herhangi bir gönderi yayınlamadı.
                </small>
              </div>
            ) : null}

            {userData &&
              userData.posts.map((post) => {
                delete post.username;
                return <PostPreview postData={post} key={post.id} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
