import React, { useEffect } from "react";
import { CloudSyncOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

import * as actions from "../../store/orders";

function Cancel({ orderStatus }) {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { user } = queryString.parse(location.search);
    if (!user) {
      return history.replace("/");
    }
    orderStatus({ user });
  }, []);

  return (
    <div className="container text-center mt-header pt-4">
      <CloudSyncOutlined className="display-1 text-danger" />
      <p className="lead">Payment failed. Try again.</p>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    orderStatus: (data) => dispatch(actions.orderStatus(data)),
  };
};

export default connect(null, mapDispatchToProps)(Cancel);
