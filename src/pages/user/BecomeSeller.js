import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import * as actions from "../../store/users";
import { Icon } from "../../components";

function BecomeSeller({ loading, redirect, makeSeller }) {
  useEffect(() => {
    if (redirect) {
      window.location.href = redirect;
    }
  }, [redirect]);

  return (
    <div className="containerC-sm mt-4 text-center">
      <Icon name="UserSwitchOutlined" className="display-1 pb-3" />
      <br />
      <h2>Setup payout to add books on E-Book</h2>
      <p className="lead text-warning">
        E-Book partners with Stripe to transfer earnings to you bank account.
      </p>
      <Button
        className="mb-3"
        type="primary"
        block
        shape="round"
        icon={
          loading ? (
            <Icon name="LoadingOutlined" />
          ) : (
            <Icon name="SettingOutlined" />
          )
        }
        size="large"
        onClick={() => makeSeller()}
      >
        {loading ? "Processing..." : "Payout Setup"}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.users.loading,
    redirect: state.users.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeSeller: () => dispatch(actions.makeSeller()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BecomeSeller);
