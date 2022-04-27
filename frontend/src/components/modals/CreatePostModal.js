import useAxios, { useAnonimAxios } from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePostModal = () => {
  let [categoryData, setCategoryData] = useState([]);
  const [createPostError, setCreatePostError] = useState(null);
  const [createPostErrorMessage, setCreatePostErrorMessage] = useState(
    "Gönderi oluşturulurken bir hata oluştu."
  );
  const { user } = useAuthContext();
  const navigate = useNavigate();

  let anonimApi = useAnonimAxios();
  let api = useAxios();

  useEffect(() => {
    anonimApi.get("/api/category/").then((res) => {
      setCategoryData(res.data);
    });
  }, []);

  return (
    <div
      className="modal fade"
      id="createPostModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">
              Yeni Gönderi
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              className="p-3"
              onSubmit={(e) => {
                e.preventDefault();

                let author = user.user_id;
                let title = e.target.title.value;
                let content = e.target.content.value;
                let categoryId = e.target.category.value;

                api
                  .post(`/api/category/${categoryId}/`, {
                    author,
                    title,
                    content,
                    owner_category: categoryId,
                  })
                  .then((res) => {
                    // Success
                    let postData = res.data;
                    setCreatePostError(false);
                    setTimeout(() => {
                      setCreatePostError(null);
                      document
                        .querySelector(
                          '#createPostModal button[data-bs-dismiss="modal"]'
                        )
                        .click();
                      navigate(`/category/${categoryId}/${postData.id}/`);
                    }, 2000);
                  })
                  .catch((err) => {
                    // Error
                    console.log(err);
                    setCreatePostErrorMessage(
                      "Gönderi oluşturulurken bir hata oluştu."
                    );
                    setCreatePostError(true);
                    setTimeout(() => {
                      setCreatePostError(null);
                    }, 2000);
                  });
              }}
            >
              <input
                type="text"
                className="form-control bg-dark text-white mb-3 p-2"
                id="title"
                placeholder="Başlık"
                required="required"
                maxLength={500}
              />
              <input
                type="text"
                className="form-control bg-dark text-white mb-3 p-2"
                id="content"
                placeholder="İçerik"
                required="required"
                maxLength={500}
              />
              <select
                className="form-select bg-dark text-white mb-3 p-2"
                id="category"
                aria-label="Default select example"
                required="required"
              >
                {/* <option selected>Kategori</option> */}
                {categoryData.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>

              {createPostError === false ? (
                <div className="alert alert-success" role="alert">
                  Başarılı bir şekilde gönderi oluşturuldu.
                  Yönlendiriliyorsunuz...
                </div>
              ) : createPostError === true ? (
                <div className="alert alert-danger" role="alert">
                  {createPostErrorMessage}
                </div>
              ) : null}

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Oluştur
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
