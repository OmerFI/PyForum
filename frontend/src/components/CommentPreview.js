import { Link } from "react-router-dom";

const CommentPreview = ({ commentData }) => {
  return (
    <div className="comment mb-3 d-flex justify-content-between" key={commentData.id}>
      <div className="comment-content">
        <Link
          to={`/category/${commentData.owner_category}/${commentData.owner_post}/`}
          className="text-decoration-none text-white"
        >
          <h6 className="white-space-pre-wrap">{commentData.content}</h6>
        </Link>
      </div>

      <div className="comment-author">
        <Link
          to={`/profile/${commentData.author}/`}
          className="text-decoration-none text-white"
        >
          <h6>{commentData.username}</h6>
        </Link>
      </div>
    </div>
  );
};

export default CommentPreview;
