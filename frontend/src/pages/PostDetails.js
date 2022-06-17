import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAnonimAxios } from "../utils/useAxios";
import useAxios from "../utils/useAxios";
import "../PostDetails.css";
import Comment from "../components/Comment";
import { useAuthContext } from "../context/AuthContext";
import RefreshPage from "../utils/Page";

const PostDetails = () => {
  let { categoryId, postId } = useParams();
  let [commentData, setCommentData] = useState(null);
  let [postDetails, setPostDetails] = useState(null);
  let [title, setTitle] = useState("");
  const [createCommentError, setCreateCommentError] = useState(null);
  const [createCommentErrorMessage, setCreateCommentErrorMessage] = useState(
    "Yorum oluşturulurken bir hata oluştu."
  );

  let { user } = useAuthContext();
  let navigate = useNavigate();
  let anonimApi = useAnonimAxios();
  let api = useAxios();

  useEffect(() => {
    anonimApi
      .get(`/api/category/${categoryId}/?post_id=${postId}`)
      .then((res) => {
        setPostDetails(res.data[0]);
        setTitle(res.data[0].title);
      })
      .catch((err) => {
        if (err.message !== "Request aborted") {
          console.log(err);
        }
        navigate(`/category/${categoryId}`);
      });

    anonimApi
      .get(`/api/category/${categoryId}/${postId}/`)
      .then((res) => {
        setCommentData(res.data);
      })
      .catch((err) => {
        if (err.message !== "Request aborted") {
          console.log(err);
        }
        navigate(`/category/${categoryId}`);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="post-title text-start" style={{ textAlign: "left" }}>
        <h1>{title}</h1>
      </div>
      <div className="container mb-5 mt-5" id="post-details">
        <div className="card bg-dark w-100">
          <div className="row">
            <div className="col-md-12 bg-opacity-10">
              <div className="row">
                <div className="col-md-12">
                  {/*  Post Content */}
                  <div className="shadow-lg mb-4">
                    {postDetails && (
                      <Comment
                        commentData={{
                          author: postDetails.author,
                          content: postDetails.content,
                          replies: [],
                          categoryId,
                          postId,
                          created_at: postDetails.created_at,
                        }}
                      />
                    )}
                  </div>
                  {/*  Comments */}
                  {commentData &&
                    commentData.map((comment) => {
                      comment.categoryId = categoryId;
                      comment.postId = postId;
                      return <Comment key={comment.id} commentData={comment} />;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          className="w-100 bg-dark text-white mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            let content = e.target.comment.value;

            api
              .post(`/api/category/${categoryId}/${postId}/`, {
                content,
              })
              .then(() => {
                // Success
                setCreateCommentError(false);
                setTimeout(() => {
                  setCreateCommentError(null);
                  RefreshPage();
                }, 2000);
              })
              .catch((err) => {
                // Error
                setCreateCommentError(true);
                setCreateCommentErrorMessage(
                  "Yorum oluşturulurken bir hata oluştu."
                );
                setTimeout(() => {
                  setCreateCommentError(null);
                }, 2000);

                if (err.message === "Request aborted") {
                  return;
                }
                console.log(err);
              });
          }}
        >
          {user && (
            <div>
              <div className="form-group">
                <label htmlFor="comment">Yorum</label>
                <textarea
                  className="form-control bg-dark text-white mt-1"
                  id="comment"
                  rows="3"
                  placeholder="Yorumunuzu giriniz..."
                  minLength={5}
                  maxLength={200}
                ></textarea>
              </div>

              {createCommentError === false ? (
                <div className="alert alert-success mt-2" role="alert">
                  Yorumunuz başarıyla oluşturuldu.
                </div>
              ) : createCommentError === true ? (
                <div className="alert alert-danger mt-2" role="alert">
                  {createCommentErrorMessage}
                </div>
              ) : null}

              <button type="submit" className="btn btn-outline-light mt-2">
                Yorum Gönder.
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostDetails;
