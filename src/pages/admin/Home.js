import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Statistic, Card, Spin } from "antd";

import * as actions from "../../store/statistics";
import * as paymentActions from "../../store/payments";

function Home({ loading, loadStatistics, data, balance, getBalance }) {
  useEffect(() => {
    loadStatistics();
    getBalance();
  }, []);

  if (loading)
    return (
      <div className="container mt-4 text-center">
        <Spin />
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 co-sm-12">
          <Card className="rounded-3">
            <Statistic title="Users" value={data?.users} />
          </Card>
        </div>
        <div className="col-md-3 co-sm-12">
          <Card className="rounded-3">
            <Statistic title="Sellers" value={data?.sellers} />
          </Card>
        </div>
        <div className="col-md-3 co-sm-12">
          <Card className="rounded-3">
            <Statistic title="Books" value={data?.books} />
          </Card>
        </div>
        <div className="col-md-3 co-sm-12">
          <Card className="rounded-3">
            <Statistic title="Orders" value={data?.orders} />
          </Card>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-3 co-sm-12">
          <Card className="rounded-3">
            <Statistic
              title="Revenue"
              value={`$${calculatePendingAmount(balance?.pending)}`}
            />
          </Card>
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
    loading: state.statistics.loading,
    data: state.statistics.data,
    balance: state.payments.balance,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStatistics: () => dispatch(actions.loadStatistics()),
    getBalance: () => dispatch(paymentActions.getBalance()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
