import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {useAnonimAxios} from "../utils/useAxios";
import PostPreview from "../components/PostPreview";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  let { categoryId } = useParams();
  let [postData, setPostData] = useState([]);
  let [title, setTitle] = useState("");

  let navigate = useNavigate();
  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get(`/api/category/?category_id=${categoryId}`)
      .then((res) => {
        setTitle(res.data[0].title);
      })
      .catch((err) => {
        // console.log(err);
        navigate("/");
      });

    anonimApi
      .get(`/api/category/${categoryId}/`)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => {
        // console.log(err);
        navigate("/");
      });
  }, []);

  return (
    <main>
      <div className="categories">
        <div className="container">
          <div className="category mt-5" key={categoryId}>
            <div className="category-title">
              <Link to="#">
                <h2>{title}</h2>
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
                return <PostPreview postData={post} key={post.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryDetails;
