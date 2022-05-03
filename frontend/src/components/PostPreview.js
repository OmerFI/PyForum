import { Link } from "react-router-dom";

const PostPreview = ({ postData }) => {
  return (
    <div className="post mb-3 d-flex justify-content-between" key={postData.id}>
      <div className="post-title">
        <Link
          to={`/category/${postData.owner_category}/${postData.id}/`}
          className="text-decoration-none text-white"
        >
          <h6>{postData.title}</h6>
        </Link>
      </div>

      <div className="post-author">
        <Link
          to={`/profile/${postData.author}/`}
          className="text-decoration-none text-white"
        >
          <h6>{postData.username}</h6>
        </Link>
      </div>
    </div>
  );
};

export default PostPreview;
