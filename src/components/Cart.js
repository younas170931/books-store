import React from "react";
import { Button } from "antd";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../store/cart";

import CartItem from "./CartItem";
import Icon from "./common/Icon";

function Cart({
  cart,
  addToCart,
  removeFromCart,
  link = "/checkout",
  checkout,
  onCheckout,
  loading,
  onCloseDrawer,
}) {
  const history = useHistory();

  const handleIncrement = (book) => () => {
    addToCart(book);
  };

  const handleDecrement = (book) => () => {
    removeFromCart({ _id: book._id });
  };

  const handleDelete = (book) => () => {
    removeFromCart({ _id: book._id, delete: true });
  };

  const handleCartCalc = () => {
    const cartItems = cart?.items || [];
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return {
      subtotal,
      total: subtotal,
    };
  };

  const handleCheckout = () => {
    if (!checkout) {
      onCloseDrawer();
      return history.push(link);
    }
    onCheckout();
  };

  const { subtotal, total } = handleCartCalc();

  if (!cart?.items?.length) {
    return (
      <div className="text-center mt-4">
        <Icon name="ShoppingOutlined" className="fs-1 mb-2" />
        <br />
        Cart is empty
      </div>
    );
  }

  return (
    <div className="mt-2 p-2">
      {cart?.items.map((book) => (
        <CartItem
          key={book._id}
          title={book.title}
          price={book.price}
          quantity={book.quantity}
          thumbnail={book?.images[0]?.url}
          onIncrement={handleIncrement(book)}
          onDecrement={handleDecrement(book)}
          onDelete={handleDelete(book)}
        />
      ))}

      <div className="mt-3 mb-3 bg-white p-2 rounded-3">
        <div className="d-flex justify-content-between pt-2 pb-2 mb-3 border-bottom">
          <div>Subtotal</div>
          <div>${Number.parseFloat(subtotal).toFixed(2)}</div>
        </div>
        <div className="d-flex justify-content-between">
          <h6>Total</h6>
          <h6>${Number.parseFloat(total).toFixed(2)}</h6>
        </div>
      </div>

      <Button
        type="primary"
        block
        shape="round"
        size="large"
        className="mt-4"
        onClick={handleCheckout}
        disabled={loading}
        loading={loading}
      >
        Checkout
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (book) => dispatch(actions.addToCart(book)),
    removeFromCart: (payload) => dispatch(actions.removeFromCart(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
