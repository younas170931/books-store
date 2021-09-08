import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

import http from "../api/client";

const initialState = {
  user: null,
  token: null,
  loading: false,
  initialLoading: true,
  error: null,
  redirect: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requested: function (auth, action) {
      auth.loading = true;
      auth.error = null;
    },
    loggedIn: function (auth, action) {
      auth.user = action.payload.user;
      auth.token = action.payload.token;
      auth.loading = false;
      if (action.user) {
        auth.redirect = "/";
      }
    },
    userDetailsRequested: function (auth, action) {
      auth.initialLoading = true;
    },
    userDetailsReceived: function (auth, action) {
      auth.user = action.payload;
      auth.initialLoading = false;
    },
    userUpdated: function (auth, action) {
      auth.loading = false;
    },
    userAccountStatusUpdated: function (auth, action) {
      auth.loading = false;
    },
    userAccountStatusUpdateFailed: function (auth, action) {
      auth.loading = false;
      auth.redirect = "/user/become-seller";
    },
    loggedOut: function (auth, action) {
      auth.user = null;
      auth.token = null;
      auth.error = null;
      auth.redirect = "";
    },
    requestFailed: function (auth, action) {
      auth.loading = false;
      auth.initialLoading = false;
      auth.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Action Creators
export const {
  requested,
  loggedIn,
  loggedOut,
  userUpdated,
  userAccountStatusUpdated,
  userAccountStatusUpdateFailed,
  userDetailsReceived,
  userDetailsRequested,
  requestFailed,
} = slice.actions;

export const login = (data) => {
  return async (dispatch) => {
    dispatch(requested());
    try {
      const res = await http.post("/auth/login", data);
      dispatch(loggedIn(res.data.data));
      // set authorization header
      setAuthorizationToken(res.data.data.token);
      toast.success("login successful");
      // save auth data in localStorage
      saveAuthDataLocally(res.data.data);
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";
      dispatch(requestFailed(errMsg));
      // Show Error toast
      toast.error(errMsg);
    }
  };
};

export const register = (data) => {
  return async (dispatch) => {
    dispatch(requested());
    try {
      const res = await http.post("/auth/register", data);
      // set authorization header
      setAuthorizationToken(res.data.data.token);
      dispatch(loggedIn(res.data.data));
      toast.success("Your account has been created successfully");
      // save auth data in localStorage
      saveAuthDataLocally(res.data.data);
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";
      dispatch(requestFailed(errMsg));
      // Show Error toast
      toast.error(errMsg);
    }
  };
};

export const updateDetails = (data) => {
  return async (dispatch) => {
    dispatch(requested());
    try {
      await http.put("/auth/updateDetails", data);
      toast.success("Your account has been updated successfully");
      dispatch(userUpdated());
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";
      dispatch(requestFailed(errMsg));
      // Show Error toast
      toast.error(errMsg);
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch) => {
    dispatch(userDetailsRequested());
    try {
      const res = await http.get("/auth/me");
      dispatch(userDetailsReceived(res.data.data));
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";
      dispatch(requestFailed(errMsg));
      // Show Error toast
      toast.error(errMsg);
    }
  };
};

export const updateUserAccountStatus = () => {
  return async (dispatch) => {
    dispatch(requested());
    try {
      const res = await http.post("/users/account-status");
      // set authorization header
      setAuthorizationToken(res.data.data.token);
      dispatch(userAccountStatusUpdated());
      dispatch(loggedIn(res.data.data));
      toast.success("congratulations! Now you became seller.");
      // save auth data in localStorage
      saveAuthDataLocally(res.data.data);
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";
      dispatch(userAccountStatusUpdateFailed());
      // Show Error toast
      toast.error(errMsg);
    }
  };
};

export const setAuthData = () => {
  let token = localStorage.getItem("token");
  if (token) {
    token = JSON.parse(token);
  }

  return (dispatch) => {
    try {
      const user = jwtDecode(token);
      setAuthorizationToken(token);
      dispatch(loggedIn({ user, token }));
    } catch (error) {}
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(loggedOut());
  };
};

// Helper functions

function saveAuthDataLocally(data) {
  localStorage.setItem("token", JSON.stringify(data.token));
}

function setAuthorizationToken(token) {
  http.defaults.headers.common = { Authorization: `Bearer ${token}` };
}
