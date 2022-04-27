import useAxios from "../../utils/useAxios";
import RefreshPage from "../../utils/Page";

const DeleteCommentModal = ({ commentData }) => {
  let commentId = commentData.id;
  let categoryId = commentData.categoryId;
  let postId = commentData.postId;

  let api = useAxios();

  return (
    <div>
      <div
        className="modal fade"
        id="deleteCommentModal"
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
                  console.log("====================");
                  console.log("commentData", commentData);
                  console.log("commentId", commentData.id);
                  console.log("categoryId", categoryId);
                  console.log("====================");
                  api
                    .delete(`/api/category/${categoryId}/${postId}/`, {
                      data: { id: commentId },
                    })
                    .then(() => {
                      // Success
                      setTimeout(() => {
                        RefreshPage();
                      }, 2000);
                    })
                    .catch((err) => {
                      // Error
                      console.log(err);
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
