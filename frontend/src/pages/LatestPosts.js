import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import PostPreview from "../components/PostPreview";

const LatestPosts = () => {
  let [posts, setPosts] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get("/api/latest-posts/")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="latest-posts">
        <div className="container">
          <div className="mt-5">
            <div className="title">
              <h2>Son Gönderiler</h2>
            </div>
            <div className="category-posts pt-3">
              {posts && posts.map((post) => {
                return <PostPreview postData={post} key={post.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LatestPosts;