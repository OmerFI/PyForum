import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import RefreshPage from "../../utils/Page";

const LoginModal = () => {
  const { loginUser } = useAuthContext();

  const [loginError, setLoginError] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(
    "Kullanıcı Adı veya Şifre Hatalı!"
  );

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">
              Giriş Yap
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
              onSubmit={async (e) => {
                e.preventDefault();

                let response = await loginUser(
                  e.target.username.value,
                  e.target.password.value
                );

                if (response.status === 200) {
                  setLoginError(null);
                  RefreshPage();
                } else {
                  if (response.message === "Network Error") {
                    // server error
                    setLoginErrorMessage("Sunucuya bağlanılamadı!");
                  }
                  setLoginError(true);
                  setTimeout(() => {
                    setLoginError(false);
                  }, 3000);
                }
              }}
            >
              <input
                type="text"
                className="form-control bg-dark text-white mb-3 p-2"
                id="username"
                placeholder="Kullanıcı Adı"
                required="required"
                autoComplete="on"
              />
              <input
                type="password"
                className="form-control bg-dark text-white mb-3 p-2"
                id="password"
                placeholder="Şifre"
                required="required"
              />

              {loginError && (
                <div className="alert alert-danger text-center" role="alert">
                  {loginErrorMessage}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
