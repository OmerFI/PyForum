import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import Reply from "./Reply";
import Settings from "../Settings";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import DeleteCommentModal from "./modals/DeleteCommentModal";
import "../css/Comment.css";

const Comment = ({ commentData }) => {
  let {
    author,
    content,
    replies,
    id: commentId,
    categoryId,
    postId,
    created_at: createdAt,
  } = commentData;
  console.log(commentData);
  let [userData, setUserData] = useState(null);
  let { user } = useAuthContext();

  let date = new Date(createdAt);
  let hours = String(date.getHours()).padStart(2, 0);
  let minutes = String(date.getMinutes()).padStart(2, 0);
  let day = String(date.getDate()).padStart(2, 0);
  let month = String(date.getMonth() + 1).padStart(2, 0);
  let year = String(date.getFullYear());
  let commentDate =
    hours + ":" + minutes + " - " + day + "." + month + "." + year;

  const [deleteCommentError, setDeleteCommentError] = useState(null);
  const [deleteCommentErrorMessage, setDeleteCommentErrorMessage] = useState(
    "Yorum silinirken bir hata oluştu."
  );

  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get(`/api/profile/${author}/`)
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
    <div className="media d-flex mb-2" id="comment">
      <div className="d-flex">
        <Link to={userData ? `/profile/${userData.user}` : ""}>
          <img
            className="mr-3 rounded-circle"
            alt=""
            src={userData && Settings().BASE_URL + userData.image}
            style={{ width: "60px", height: "60px" }}
          />
        </Link>
        <div id="comment-author-info">
          <Link
            to={userData ? `/profile/${userData.user}` : ""}
            className="text-decoration-none"
            id="comment-author-username"
          >
            {userData
              ? userData.full_name !== ""
                ? userData.full_name
                : userData.username
              : ""}
          </Link>
          <p id="comment-author-date">{commentDate}</p>
        </div>
        {commentId && user && user.user_id === author && (
          <div className="p-3">
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target={"#deleteCommentModal-" + commentId}
            >
              Yorumu Sil
            </button>
            <DeleteCommentModal commentData={commentData} />
          </div>
        )}
      </div>
      <div className="media-body flex-grow-1" id="comment-content">
        <p>{content}</p>
        <div className="replies small text-small">
          {replies.map((reply) => (
            <Reply replyData={reply} key={reply.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
