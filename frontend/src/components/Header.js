import CreateModals from "./CreateModals";
import HeaderUserDetail from "./HeaderUserDetail";
import "../Header.css";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none navbar-brand"
          >
            <span className="brand-part1">Py</span>
            <span className="brand-part2">Forum</span>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 link-light">
                Anasayfa
              </Link>
            </li>
            <li>
              <Link to="/latest-posts" className="nav-link px-2 link-light">
                Son Gönderiler
              </Link>
            </li>
            <li>
              <Link to="/latest-comments" className="nav-link px-2 link-light">
                Son Yorumlar
              </Link>
            </li>
            <li>
              <a
                href="https://linktr.ee/omerfi"
                target="_blank"
                className="nav-link px-2 link-light"
                rel="noreferrer"
              >
                Faydalı Kaynaklar
              </a>
            </li>
          </ul>

          <CreateModals />
          <HeaderUserDetail />
        </div>
      </div>
    </header>
  );
};

export default Header;
