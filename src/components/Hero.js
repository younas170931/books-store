import { useState } from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";

import Icon from "./common/Icon";

import "../styles/Hero.css";
import bannerImg from "../assets/images/Banner-2.jpg";

export default function Hero() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSearch = () => {
    if (search) {
      history.push("/books?text[search]=" + search);
    }
  };

  return (
    <div className="hero position-relative">
      <img src={bannerImg} alt="E-Book" />
      <div className="hero__content position-absolute start-50 translate-middle text-center p-4">
        <div className="hero__search d-flex">
          <input
            placeholder="Search"
            className="text-dark"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="hero__search-btn" onClick={handleSearch}>
            <Icon name="SearchOutlined" style={{ fontSize: 24 }} />
          </div>
        </div>
        <h3 className="text-light mt-4 mb-3 fw-normal">
          Enjoy Your Life, Start Your Journey With Books
        </h3>
        <small className="text-light">
          The only E-Book marketplace that offers 88% revenue to it's seller
        </small>
        <br />
        <Link to="/register">
          <Button
            size="large"
            type="ghost"
            className="mt-4 me-3 rounded-4 text-light"
          >
            Become Seller
          </Button>
        </Link>
      </div>
    </div>
  );
}
