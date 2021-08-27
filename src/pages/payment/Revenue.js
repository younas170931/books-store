import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";

import { DollarOutlined, SettingOutlined } from "@ant-design/icons";

import * as actions from "../../store/payments";

function Revenue({ loading, getBalance, getLoginLink, balance, loginLink }) {
  useEffect(() => {
    getBalance();
    getLoginLink();
  }, []);

  const handleLoginLink = () => {
    if (loginLink) {
      window.location.href = loginLink;
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-header pt-4">
        <Spin />
      </div>
    );
  }
  return (
    <div className="container ">
      <div className="row pt-2">
        <div className="col-md-8 offset-md-2 bg-light p-5">
          <h2>
            Revenue report <DollarOutlined className="float-end" />
          </h2>
          <small>
            You get paid directly from stripe to your bank account every 48 hour
          </small>
          <hr />
          <h4>
            Pending balance
            <span className="float-end">
              ${calculatePendingAmount(balance?.pending)}
            </span>
          </h4>
          <small>For last 48 hours</small>
          <hr />
          <h4>
            Payouts
            <SettingOutlined
              className="float-end cursor"
              onClick={handleLoginLink}
            />
          </h4>
          <small>
            Update your stripe account details or view previous payouts.
          </small>
        </div>
      </div>
    </div>
  );
}

function calculatePendingAmount(pendingBalance = []) {
  let amount = 0;
  pendingBalance.forEach((i) => {
    amount += i.amount / 100;
  });

  return amount;
}

const mapStateToProps = (state) => {
  return {
    loading: state.payments.loading,
    loginLink: state.payments.loginLink,
    balance: state.payments.balance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: () => dispatch(actions.getBalance()),
    getLoginLink: () => dispatch(actions.getLoginLink()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
