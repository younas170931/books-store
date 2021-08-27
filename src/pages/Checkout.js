import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../store/orders";
import { Cart } from "../components";

function Checkout({ checkout, cart, loading, redirect }) {
  useEffect(() => {
    if (!loading && redirect && redirect !== "/") {
      window.location.href = redirect;
    }
  }, [redirect]);

  const handleCheckout = () => {
    const books = cart.items.map((b) => ({ _id: b._id, quantity: b.quantity }));
    checkout(books);
  };

  return (
    <div className="containerC-sm mt-4">
      <Cart onCheckout={handleCheckout} loading={loading} checkout />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    loading: state.orders.loading,
    redirect: state.orders.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: (books) => dispatch(actions.checkout(books)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
