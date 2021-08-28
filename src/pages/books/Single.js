import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Button, Spin } from "antd";

import * as actions from "../../store/books";
import * as cartActions from "../../store/cart";
import "../../styles/Single.css";
import { Slider, Icon } from "../../components";

function Single({ initialLoading, loadBook, book, addToCart, cart }) {
  const params = useParams();
  const history = useHistory();

  const [sliderImage, setSliderImage] = useState("");

  useEffect(() => {
    loadBook(params.id);
  }, []);

  useEffect(() => {
    if (!initialLoading && book) {
      setSliderImage(book.images[0].url);
    }
  }, [book]);

  const handleAddToCart = () => {
    addToCart(book);
  };

  const handleBuyNow = () => {
    addToCart(book);
    history.push("/checkout");
  };

  if (initialLoading) {
    return (
      <div className="container mt-header pt-4 text-center">
        <Spin />
      </div>
    );
  }

  const images = book?.images || [];
  return (
    <div className="containerC-md mt-4">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="mb-2">
            <img
              src={sliderImage}
              alt="Slice Image"
              class="img-fluid rounded"
            />
          </div>
          <Slider
            slidesToShow={images.length > 3 ? 3 : images.length}
            variableWidth={true}
          >
            {images.map((image) => (
              <div key={image.url} onClick={() => setSliderImage(image.url)}>
                <div className="slider__slide">
                  <img
                    src={image.url}
                    alt={image.name}
                    class="img-fluid rounded"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="col-sm-12 col-md-8">
          <h1 className="h3">{book?.title}</h1>
          <div className="lead mb-2">${book?.price}</div>

          {book?.author && (
            <h6 className="mb-2">
              <strong>Author:</strong> {book.author}
            </h6>
          )}

          <p>{book?.description}</p>
          <div className="mb-1">
            <strong>Seller Details</strong>
          </div>
          {book?.seller && (
            <Link to={`/books?seller[eq]=${book.seller._id}`}>
              <Icon name="UserOutlined" />
              <small className="ms-1">{book.seller.name}</small>
            </Link>
          )}

          {book?.seller?.address && (
            <div className="mb-4">
              <Icon name="EnvironmentOutlined" />
              <small className="ms-1">
                {book.seller.address.city}, {book.seller.address.province}
              </small>
            </div>
          )}

          <div className="d-flex mt-4 single__cta">
            <Button
              type="primary"
              shape="round"
              size="large"
              className="me-2"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
            <Button
              type="ghost"
              shape="round"
              size="large"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    book: state.books.book,
    initialLoading: state.books.initialLoading,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBook: (id) => dispatch(actions.loadBook(id)),
    addToCart: (book) => dispatch(cartActions.addToCart(book)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Single);
