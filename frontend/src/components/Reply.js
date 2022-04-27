import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import Settings from "../Settings";

const Reply = ({ replyData }) => {
  let { author, content } = replyData;
  let anonimApi = useAnonimAxios();
  let [userData, setUserData] = useState(null);

  useEffect(() => {
    anonimApi
      .get(`/api/profile/${author}/`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="media mt-4 d-flex" id="reply">
      <a className="pr-3" href="#">
        <img
          className="rounded-circle"
          src={userData && Settings().BASE_URL + userData.image}
          style={{ width: "30px", height: "30px" }}
        />
      </a>
      <div className="media-body ms-2">
        <div className="row">
          <div className="col-12 d-flex">
            <h6>{userData ? userData.full_name : ""}</h6>
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Reply;
