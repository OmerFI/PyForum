import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto text-white-50 text-center">
      <p>
        <Link
          to="https://github.com/OmerFI"
          target="_blank"
          className="text-white me-1"
        >
          ÖmerFİ
        </Link>
        tarafından hazırlanmıştır.
      </p>
    </footer>
  );
};

export default Footer;
