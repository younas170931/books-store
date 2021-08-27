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
  name: "users",
  initialState,
  reducers: {
    requested: function (users, action) {
      users.loading = true;
    },
    sellerMakeRequested: function (users, action) {
      users.loading = false;
      users.redirect = action.payload.data;
    },
    usersLoadRequested: function (users, action) {
      users.initialLoading = true;
      users.pagination = {};
    },
    usersLoaded: function (users, action) {
      users.initialLoading = false;
      users.list = action.payload.data;
      const pagination = action.payload.pagination;
      users.pagination = pagination ? pagination : {};
    },
    moreUsersLoaded: function (users, action) {
      users.loading = false;
      users.list = users.list.concat(action.payload.data);

      const pagination = action.payload.pagination;
      users.pagination = pagination ? pagination : {};
    },
    userDeleted: function (users, action) {
      users.loading = false;
      users.list = users.list.filter((b) => b._id !== action.payload.data._id);
    },
    requestFailed: function (users, action) {
      users.loading = false;
      users.initialLoading = false;
      users.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions creators
export const {
  requested,
  requestFailed,
  sellerMakeRequested,
  usersLoadRequested,
  moreUsersLoaded,
  usersLoaded,
  userDeleted,
} = slice.actions;

const endpoint = "/users";

export const makeSeller = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/make-seller",
        method: "POST",
        onStart: requested.type,
        onSuccess: sellerMakeRequested.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const loadUsers = (q) => {
  let endpoint = "/users";
  if (q) {
    endpoint += "?" + q;
  }
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        onStart: usersLoadRequested.type,
        onSuccess: usersLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const loadMoreUsers = (q) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/users?" + q,
        onStart: requested.type,
        onSuccess: moreUsersLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/users/" + id,
        method: "DELETE",
        toastMessage: "User has been deleted successfully",
        onStart: requested.type,
        onSuccess: userDeleted.type,
        onError: requestFailed.type,
      })
    );
  };
};
