import CreatePostModal from "./modals/CreatePostModal";
import CreateCategoryModal from "./modals/CreateCategoryModal";
import { useAuthContext } from "../context/AuthContext";

const CreateModals = () => {
  const { user } = useAuthContext();
  const isAdmin = user && user.is_admin;

  return (
    <div>
      <div className="buttons">
        {isAdmin ? (
          <button
            className="btn btn-info me-3"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createCategoryModal"
          >
            Yeni Kategori
          </button>
        ) : null}
        {user ? (
          <button
            className="btn btn-warning me-5"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createPostModal"
          >
            Yeni Gönderi
          </button>
        ) : null}
      </div>

      {isAdmin ? <CreateCategoryModal /> : null}
      {user ? <CreatePostModal /> : null}
    </div>
  );
};

export default CreateModals;
