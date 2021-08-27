import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Spin } from "antd";
import queryString from "query-string";

import * as actions from "../../store/orders";
import * as cartActions from "../../store/cart";

function Success({ loading, redirect, orderStatus, clearCart }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { user } = queryString.parse(location.search);
    if (!user) {
      return history.replace("/");
    }
    orderStatus({ user });
    clearCart();
  }, []);

  useEffect(() => {
    if (redirect) {
      history.replace(redirect);
    }
  }, [redirect]);

  if (loading)
    return (
      <div className="container text-center mt-header pt-4">
        <Spin />
      </div>
    );

  return (
    <div className="container text-center mt-4">
      <p className="lead">Error! Please refresh the page</p>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.orders.loading,
    redirect: state.orders.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    orderStatus: (data) => dispatch(actions.orderStatus(data)),
    clearCart: () => dispatch(cartActions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
