import React from "react";
import visaLogo from "../assets/images/visa-logo.png";
import Icon from "./common/Icon";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="containerC">
        <div className="row pt-2">
          <div className="col-md-4 fs-6 mb-3">
            <small>Copyrights © 2021 E-Book. All rights reserved</small>
          </div>
          <div className="col-md-4 text-center mb-3">
            <Icon
              name="FacebookOutlined"
              style={{ marginRight: 4, fontSize: 22 }}
            />
            <Icon
              name="InstagramOutlined"
              style={{ marginRight: 4, fontSize: 22 }}
            />
          </div>
          <div className="col-md-4 footer-right">
            <img src={visaLogo} alt="Visa" style={{ width: 100 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
