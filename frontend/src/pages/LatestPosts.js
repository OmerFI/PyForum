import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import PostPreview from "../components/PostPreview";
import SkeletonPostPreview from "../components/skeletons/SkeletonPostPreview";

const LatestPosts = () => {
  let [posts, setPosts] = useState(null);

  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get("/api/latest-posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
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
              {posts &&
                posts.map((post) => {
                  return <PostPreview postData={post} key={post.id} />;
                })}

              {!posts &&
                [...Array(5)].map((_, index) => (
                  <SkeletonPostPreview key={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LatestPosts;
