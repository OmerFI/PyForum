import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import Reply from "./Reply";
import Settings from "../Settings";
import { Link } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";
// import DeleteCommentModal from "./modals/DeleteCommentModal";

const Comment = ({ commentData }) => {
  let { author, content, replies } = commentData;
  let anonimApi = useAnonimAxios();
  let [userData, setUserData] = useState(null);
  // let { user } = useAuthContext();

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
    <div className="media d-flex mb-2" id="comment">
      <Link to={userData ? `/profile/${userData.user}` : ""}>
        <img
          className="mr-3 rounded-circle"
          alt=""
          src={userData && Settings().BASE_URL + userData.image}
          style={{ width: "60px", height: "60px" }}
        />
      </Link>
      <div className="media-body ms-4 flex-grow-1">
        <div className="row">
          <div className="col-8 d-flex">
            <Link
              to={userData ? `/profile/${userData.user}` : ""}
              className="text-decoration-none"
            >
              <h5>
                {userData
                  ? userData.full_name !== ""
                    ? userData.full_name
                    : userData.username
                  : ""}
              </h5>
            </Link>
          </div>
        </div>
        <p>{content}</p>
        <div className="replies small text-small">
          {replies.map((reply) => (
            <Reply replyData={reply} key={reply.id} />
          ))}
        </div>
      </div>
      {/* {user && user.user_id === author && (
        <div className="p-3">
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#deleteCommentModal"
          >
            Yorumu Sil
          </button>
          <DeleteCommentModal commentData={commentData} />
        </div>
      )} */}
    </div>
  );
};

export default Comment;
