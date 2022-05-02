import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mt-auto text-white-50 text-center">
      <p>
        <a
          href="https://github.com/OmerFI"
          target="_blank"
          className="text-white me-1"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} className="me-2"/>
          ÖmerFİ
        </a>
        tarafından hazırlanmıştır.
      </p>
    </footer>
  );
};

export default Footer;
