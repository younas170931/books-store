import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  loading: false,
  initialLoading: true,
  balance: null,
  error: null,
  loginLink: "",
};

const slice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    requested: function (payments, action) {
      payments.loading = true;
      payments.error = null;
    },
    balanceFetched: function (payments, action) {
      payments.loading = false;
      payments.balance = action.payload.data;
    },
    loginLinkCreated: function (payments, action) {
      payments.loading = false;
      payments.loginLink = action.payload.data;
    },
    requestFailed: function (payments, action) {
      payments.loading = false;
      payments.initialLoading = false;
      payments.error = action.payload;
    },
  },
});

export default slice.reducer;

// Action creator
const { requested, requestFailed, balanceFetched, loginLinkCreated } =
  slice.actions;

const endpoint = "/payments";

export const getBalance = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/get-balance",
        onStart: requested.type,
        onSuccess: balanceFetched.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const getLoginLink = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/get-login-link",
        onStart: requested.type,
        onSuccess: loginLinkCreated.type,
        onError: requestFailed.type,
      })
    );
  };
};
