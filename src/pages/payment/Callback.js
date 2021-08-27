import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

import * as actions from "../../store/auth";

function PaymentCallback({ redirect, accountStatus }) {
  const history = useHistory();

  useEffect(() => {
    accountStatus();
  }, []);

  useEffect(() => {
    if (redirect) {
      history.replace(redirect);
    }
  }, [redirect]);

  return (
    <div className="container mt-header pt-4 text-center">
      <Spin />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    redirect: state.auth.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    accountStatus: () => dispatch(actions.updateUserAccountStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentCallback);
