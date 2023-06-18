import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer_">
      <div className="foot">
        <div className="foot_top">
          <div className="left_footer">
            <p className="foot_app">Tiny Miracles</p>
            <p id="title_">Share your thoughts, connect with the world</p>
          </div>
          <div className="right_footer">
            <p
              className="foot_links"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </p>
            <p
              onClick={() => {
                navigate("/explore");
              }}
              className="foot_links"
            >
              Explore
            </p>
            <p
              className="foot_links"
              onClick={() => {
                navigate("/my-blogs");
              }}
            >
              Create
            </p>
          </div>
        </div>
      </div>
      <hr className="bar_foot" />
      <div className="policy_">
        <p> </p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default Footer;
