import useAxios, { useAnonimAxios } from "../../utils/useAxios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RefreshPage from "../../utils/Page";

const CreateCategoryModal = () => {
  let [categoryData, setCategoryData] = useState([]);
  const [createCategoryError, setCreateCategoryError] = useState(null);
  const [createCategoryErrorMessage, setCreateCategoryErrorMessage] = useState(
    "Kategori oluşturulurken bir hata oluştu."
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
      id="createCategoryModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">
              Yeni Kategori
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

                let title = e.target.title.value;

                api
                  .post(`/api/category/`, {
                    title,
                  })
                  .then((res) => {
                    // Success
                    let categoryData = res.data;
                    setCreateCategoryError(false);
                    setTimeout(() => {
                      setCreateCategoryError(null);
                      document
                        .querySelector(
                          '#createCategoryModal button[data-bs-dismiss="modal"]'
                        )
                        .click();
                      navigate(`/category/${categoryData.id}/`);
                      RefreshPage();
                    }, 2000);
                  })
                  .catch((err) => {
                    // Error
                    if (err.message !== "Request aborted") {
                      console.log(err);
                    }
                    setCreateCategoryError(true);
                    setCreateCategoryErrorMessage(
                      "Kategori oluşturulurken bir hata oluştu."
                    );
                    setTimeout(() => {
                      setCreateCategoryError(null);
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

              {createCategoryError === false ? (
                <div className="alert alert-success" role="alert">
                  Başarılı bir şekilde kategori oluşturuldu.
                  Yönlendiriliyorsunuz...
                </div>
              ) : createCategoryError === true ? (
                <div className="alert alert-danger" role="alert">
                  {createCategoryErrorMessage}
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

export default CreateCategoryModal;
