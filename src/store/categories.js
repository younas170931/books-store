import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  list: [],
  categoryAdded: false,
  initialLoading: true,
  category: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    requested: function (categories, action) {
      categories.loading = true;
      categories.error = null;
      categories.categoryAdded = false;
      categories.category = null;
    },
    categoriesLoadRequested: function (categories, action) {
      categories.initialLoading = true;
    },
    categoriesLoaded: function (categories, action) {
      categories.initialLoading = false;
      categories.loading = false;
      categories.list = action.payload.data;
    },
    categoryLoaded: function (categories, action) {
      categories.loading = false;
      categories.initialLoading = false;
      categories.category = action.payload.data;
    },
    categoryAdded: function (categories, action) {
      categories.loading = false;
      categories.categoryAdded = true;
    },
    categoryUpdated: function (categories, action) {
      categories.loading = false;
    },
    categoryDeleted: function (categories, action) {
      categories.list = categories.list.filter(
        (c) => c._id !== action.payload.data._id
      );
      categories.loading = false;
    },
    requestFailed: function (categories, action) {
      categories.loading = false;
      categories.initialLoading = false;
      categories.categoryAdded = false;
      categories.error = action.payload;
    },
  },
});

export default slice.reducer;

// Action creators
const {
  requested,
  requestFailed,
  categoriesLoadRequested,
  categoriesLoaded,
  categoryLoaded,
  categoryUpdated,
  categoryAdded,
  categoryDeleted,
} = slice.actions;

const endpoint = "/categories";

export const loadCategories = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        onStart: categoriesLoadRequested.type,
        onSuccess: categoriesLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const loadCategory = (id) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/" + id,
        onStart: categoriesLoadRequested.type,
        onSuccess: categoryLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        method: "POST",
        data,
        toastMessage: "Category has been added successfully",
        onStart: requested.type,
        onSuccess: categoryAdded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const updateCategory = (id, data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/" + id,
        method: "PUT",
        data,
        toastMessage: "Category has been updated successfully",
        onStart: requested.type,
        onSuccess: categoryUpdated.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint + "/" + id,
        method: "DELETE",
        toastMessage: "Category has been Deleted successfully",
        onStart: requested.type,
        onSuccess: categoryDeleted.type,
        onError: requestFailed.type,
      })
    );
  };
};
