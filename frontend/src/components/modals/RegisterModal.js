import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const RegisterModal = () => {
  const { registerUser } = useAuthContext();

  const [registerError, setRegisterError] = useState(null);
  const [registerErrorMessage, setRegisterErrorMessage] = useState(
    "Lütfen tüm alanları doldurun."
  );

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex={-1}
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="modalTitle">
              Kaydol
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

                let form = e.target;
                let username = form.username.value;
                let email = form.email.value;
                let password = form.password.value;

                let pattern = /^[\w.@+-]+$/;
                if (!pattern.test(username)) {
                  setRegisterErrorMessage(
                    "Geçersiz kullanıcı adı girdiniz. Kullanıcı adı sadece harf, rakam, @, ., +, - ve _ işaretleri içerebilir."
                  );
                  setRegisterError(true);
                  setTimeout(() => {
                    setRegisterError(false);
                  }, 3000);
                  return;
                }

                if (password.length < 8) {
                  setRegisterErrorMessage("Şifre en az 8 karakter olmalıdır.");
                  setRegisterError(true);
                  setTimeout(() => {
                    setRegisterError(false);
                  }, 3000);
                  return;
                }

                let response = await registerUser(username, email, password);

                if (response.message === "Network Error") {
                  // server error
                  setRegisterError(true);
                  setRegisterErrorMessage("Sunucuya bağlanılamadı!");
                  return;
                }

                if (response.status === 400) {
                  // Bad request
                  if (response.data.username) {
                    setRegisterErrorMessage(
                      "Kullanıcı adı bir başkası tarafından kullanılıyor!"
                    );
                  } else if (response.data.email) {
                    setRegisterErrorMessage(
                      "E-posta adresi bir başkası tarafından kullanılıyor!"
                    );
                  } else {
                    setRegisterErrorMessage("Lütfen tüm alanları doldurun.");
                  }
                  setRegisterError(true);
                  setTimeout(() => {
                    setRegisterError(false);
                  }, 3000);
                  return;
                }
              }}
            >
              <input
                type="text"
                className="form-control bg-dark text-white mb-3 p-2"
                id="username"
                placeholder="Kullanıcı adı"
                required="required"
                autoComplete="on"
              />
              <input
                type="email"
                className="form-control bg-dark text-white mb-3 p-2"
                id="email"
                placeholder="E-posta"
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

              {registerError && (
                <div className="alert alert-danger text-center" role="alert">
                  {registerErrorMessage}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 mt-2">
                Kaydol
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
