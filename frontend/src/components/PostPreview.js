import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useAnonimAxios } from "../utils/useAxios";

const PostPreview = ({ postData }) => {
  // let anonimApi = useAnonimAxios();
  // let [authorName, setAuthorName] = useState("");

  // useEffect(() => {
  //   anonimApi
  //     .get(`/api/profile/${postData.author}/`)
  //     .then((res) => {
  //       setAuthorName(res.data.username);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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

      {postData.username ? (
        <div className="post-author">
          <Link
            to={`/profile/${postData.author}/`}
            className="text-decoration-none text-white"
          >
            <h6>{postData.username}</h6>
          </Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostPreview;
