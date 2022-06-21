import { useState, useEffect } from "react";
import { useAnonimAxios } from "../utils/useAxios";
import CommentPreview from "../components/CommentPreview";
import SkeletonPostPreview from "../components/skeletons/SkeletonPostPreview";

const LatestComments = () => {
  let [comments, setComments] = useState(null);
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(true);

  let anonimApi = useAnonimAxios();

  useEffect(() => {
    anonimApi
      .get("/api/latest-comments/")
      .then((response) => {
        setComments(response.data);
        console.log(comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <div className="latest-comments">
        <div className="container">
          <div className="mt-5">
            <div className="title">
              <h2>Son Yorumlar</h2>
            </div>
            <div className="comments pt-3">
              {comments &&
                comments.map((comment) => {
                  return (
                    <CommentPreview commentData={comment} key={comment.id} />
                  );
                })}

              {!comments &&
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

export default LatestComments;
