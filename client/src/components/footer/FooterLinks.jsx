import React from "react";
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImg from "../../assets/shopito_logo.png";
import links from "./links";

const FooterLinks = () => {
  return (
    <>
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>
          <h2>Let's Talk?</h2>
          <button className="btn btn-dark">
            <Link to={"#"}>Make an Enquiry!</Link>
          </button>
        </div>
      </section>
      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            <img src={logoImg} alt="SellOut Logo" />
          </div>
          {links.map((link, index) => {
            const { header, link1, link2, link3, link4, linkTag } = link;

            return (
              <div className="footer-menu" key={index}>
                <p className="link-heading">{header}</p>
                <ul className="nav-ul footer-links">
                  <li>
                    <Link to={linkTag.linkTag1}>{link1}</Link>
                  </li>
                  <li>
                    <Link to={linkTag.linkTag2}>{link2}</Link>
                  </li>
                  <li>
                    <Link to={linkTag.linkTag3}>{link3}</Link>
                  </li>
                  <li>
                    <Link to={linkTag.linkTag4}>{link4}</Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
