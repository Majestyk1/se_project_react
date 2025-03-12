import React from "react";
import "./Footer.css"; // Optional: Add styling if needed

function Footer() {
  return (
    <footer className="footer">
      <p
        className="footer__text"
        style={{ fontFamily: "CabinetGrotesk-Medium" }}
      >
        Developed by Majestyk Vaughns
      </p>
      <p className="footer__date">© {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
