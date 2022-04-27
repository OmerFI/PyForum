import PostPreview from "./PostPreview";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";

const Category = ({ categoryData }) => {
  let postCount = 0;
  let breakLoop = false;
  let anonimApi = useAnonimAxios();
  let [postData, setPostData] = useState([]);

  useEffect(() => {
    anonimApi
      .get(`/api/category/${categoryData.id}/`)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="category mt-5" key={categoryData.id}>
      <div className="category-title">
        <Link to={`/category/${categoryData.id}/`}>
          <h2>{categoryData.title}</h2>
        </Link>
      </div>
      <div className="category-posts pt-3">
        {postData.length === 0 ? (
          <div className="text-left">
            <small className="text-white-50">
              Bu kategoride henüz bir gönderi yok!
            </small>
          </div>
        ) : null}

        {postData.map((post) => {
          if (postCount <= 4) {
            postCount++;
            return <PostPreview postData={post} key={post.id} />;
          } else {
            if (!breakLoop) {
              breakLoop = true;
              return (
                <Link
                  to={`/category/${categoryData.id}/`}
                  key={999}
                  className="text-decoration-none"
                >
                  <small className="text-white-50">
                    Daha fazlası için tıklayınız...
                  </small>
                </Link>
              );
            } else {
              return null;
            }
          }
        })}
      </div>
    </div>
  );
};

export default Category;
