import useAxios from "../../utils/useAxios";
import RefreshPage from "../../utils/Page";
import { useState } from "react";

const DeleteCommentModal = ({ commentData }) => {
  const [deleteCommentError, setDeleteCommentError] = useState(null);
  const [deleteCommentErrorMessage, setDeleteCommentErrorMessage] = useState(
    "Yorum silinirken bir hata oluştu."
  );

  let commentId = commentData.id;
  let categoryId = commentData.categoryId;
  let postId = commentData.postId;

  let api = useAxios();

  return (
    <div>
      <div
        className="modal fade"
        id={"deleteCommentModal-" + commentId}
        tabIndex={-1}
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">
                Yorumunuzu Silin
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri
                alınamaz.
              </p>
            </div>
            <div className="modal-footer">
              {deleteCommentError === false ? (
                <div className="alert alert-success" role="alert">
                  Yorum başarıyla silindi.
                </div>
              ) : deleteCommentError === true ? (
                <div className="alert alert-danger" role="alert">
                  {deleteCommentErrorMessage}
                </div>
              ) : null}

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                İptal
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();

                  api
                    .delete(`/api/category/${categoryId}/${postId}/`, {
                      data: {
                        id: commentId,
                      },
                    })
                    .then(() => {
                      // Success
                      setDeleteCommentError(false);
                      setTimeout(() => {
                        setDeleteCommentError(null);
                        RefreshPage();
                      }, 2000);
                    })
                    .catch((err) => {
                      // Error
                      console.log(err);
                      setDeleteCommentErrorMessage(
                        "Yorum silinirken bir hata oluştu."
                      );
                      setDeleteCommentError(true);
                      setTimeout(() => {
                        setDeleteCommentError(null);
                      }, 2000);
                    });
                }}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
