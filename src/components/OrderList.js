import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List, Avatar, Spin, Modal } from "antd";

import * as actions from "../store/orders";

function OrderList({ orders, loading, loadOrders }) {
  const [state, setState] = useState({ showModal: false });

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={orders}
        renderItem={(order) => (
          <List.Item
            actions={[
              <span
                key="delete"
                className="cursor"
                onClick={() => setState({ showModal: true, order })}
              >
                View Order
              </span>,
            ]}
            className="list__item"
          >
            <List.Item.Meta
              avatar={<Avatar src={order.books?.[0].image} />}
              title={order.books[0].title + "...."}
              description={"$" + Number.parseFloat(order.total).toFixed(2)}
            />
          </List.Item>
        )}
      />
      <Modal
        title={state.order?.title}
        visible={state.showModal}
        onOk={() => setState({ showModal: false })}
        confirmLoading={loading}
        onCancel={() => setState({ showModal: false })}
      >
        <ShowOrderDetails order={state.order} />
      </Modal>
    </>
  );
}

function ShowOrderDetails({ order = { books: [] } }) {
  return (
    <div className="mt-4">
      {order.books.map((book) => (
        <List.Item.Meta
          avatar={<Avatar src={book.image} />}
          title={book.title}
          description={
            <div className="d-flex justify-content-between">
              <span>{"$" + book.price}</span>
              <span>{book.quantity}</span>
            </div>
          }
        ></List.Item.Meta>
      ))}
      <div className="d-flex flex-fill justify-content-between mt-4">
        <h6>Total</h6>
        <h6>${Number.parseFloat(order.total).toFixed(2)}</h6>
      </div>
      <div className="d-flex flex-fill justify-content-between mt-2">
        <h6>Payment Status</h6>
        <h6>{order.payment ? "Paid" : "unpaid"}</h6>
      </div>
      <hr />
      <div className="mt-4">
        <h5>Shipping Address</h5>
        <div>{order.user?.name}</div>
        <div>{order.user?.email}</div>
        <div>{order.user?.phoneNo}</div>
        <div className="mt-3">
          <strong>Address: </strong>
          {order.user?.address?.address}
        </div>
        <div>
          <strong>City: </strong>
          {order.user?.address?.city}
        </div>
        <div>
          <strong>Province: </strong>
          {order.user?.address?.province}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.list,
    loading: state.orders.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadOrders: () => dispatch(actions.loadOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
