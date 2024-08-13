import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Your Times. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
