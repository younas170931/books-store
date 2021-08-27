import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  list: [],
  pagination: {},
  initialLoading: true,
  loading: false,
  error: null,
  redirect: "",
};

const slice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    requested: function (orders, action) {
      orders.loading = true;
      orders.redirect = "";
      orders.error = null;
    },
    ordersLoaded: function (orders, action) {
      orders.loading = false;
      orders.list = action.payload.data;
    },
    checkedOut: function (orders, action) {
      orders.loading = false;
      orders.redirect = action.payload.data;
    },
    orderStatusUpdated: function (orders, action) {
      orders.loading = false;
      orders.redirect = "/";
    },
    orderStatusUpdateFailed: function (orders, action) {
      orders.loading = false;
      const statusCode = action.payload.status;
      if (statusCode && statusCode >= 400 && statusCode <= 403) {
        orders.redirect = "/";
      }
    },
    requestFailed: function (orders, action) {
      orders.loading = false;
      orders.initialLoading = false;
      orders.error = action.payload;
      orders.redirect = "";
    },
  },
});

export default slice.reducer;

// Action creators
const {
  requested,
  requestFailed,
  ordersLoaded,
  checkedOut,
  orderStatusUpdated,
  orderStatusUpdateFailed,
} = slice.actions;

const endpoint = "/orders";

export const loadOrders = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        onStart: requested.type,
        onSuccess: ordersLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const checkout = (data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/checkout",
        method: "POST",
        data,
        onStart: requested.type,
        onSuccess: checkedOut.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const orderStatus = (data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/order-status",
        method: "PUT",
        data,
        onStart: requested.type,
        onSuccess: orderStatusUpdated.type,
        toastMessage: "Your order has been placed successfully",
        onError: orderStatusUpdateFailed.type,
      })
    );
  };
};
