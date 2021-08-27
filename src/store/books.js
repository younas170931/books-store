import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const initialState = {
  list: [],
  pagination: {},
  book: null,
  bookAdded: false,
  initialLoading: true,
  loading: false,
  error: null,
};
const slice = createSlice({
  name: "books",
  initialState,
  reducers: {
    requested: function (books, action) {
      books.loading = true;
      books.bookAdded = false;
      books.error = null;
      books.book = null;
    },
    booksLoadRequested: function (books, action) {
      books.initialLoading = true;
      books.pagination = {};
    },
    booksLoaded: function (books, action) {
      books.initialLoading = false;
      books.list = action.payload.data;
      const pagination = action.payload.pagination;
      books.pagination = pagination ? pagination : {};
    },
    moreBooksLoaded: function (books, action) {
      books.loading = false;
      books.list = books.list.concat(action.payload.data);

      const pagination = action.payload.pagination;
      books.pagination = pagination ? pagination : {};
    },
    bookLoadRequested: function (books, action) {
      books.initialLoading = true;
    },
    bookLoaded: function (books, action) {
      books.initialLoading = false;
      books.book = action.payload.data;
    },
    bookAdded: function (books, action) {
      books.loading = false;
      books.list.push(action.payload.data);
      books.bookAdded = true;
    },
    bookUpdated: function (books, action) {
      books.loading = false;
      books.list = books.list.map((b) => {
        if (b._id === action.payload.data._id) {
          return action.payload.data;
        }
        return b;
      });
    },
    bookDeleted: function (books, action) {
      books.loading = false;
      books.list = books.list.filter((b) => b._id !== action.payload.data._id);
    },
    requestFailed: function (books, action) {
      books.loading = false;
      books.initialLoading = false;
      books.error = action.payload;
      books.book = null;
    },
  },
});

export default slice.reducer;

// Action Creators
export const {
  requested,
  booksLoadRequested,
  booksLoaded,
  moreBooksLoaded,
  bookLoadRequested,
  bookLoaded,
  bookAdded,
  bookUpdated,
  bookDeleted,
  requestFailed,
} = slice.actions;

export const loadBooks = (q) => {
  let endpoint = "/books";
  if (q) {
    endpoint += "?" + q;
  }
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        onStart: booksLoadRequested.type,
        onSuccess: booksLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const loadMoreBooks = (q) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/books?" + q,
        onStart: requested.type,
        onSuccess: moreBooksLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const loadBook = (id) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/books/" + id,
        onStart: bookLoadRequested.type,
        onSuccess: bookLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const addBook = (data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/books",
        method: "POST",
        data,
        toastMessage: "Book has been added successfully",
        onStart: requested.type,
        onSuccess: bookAdded.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const updateBook = (id, data) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/books/" + id,
        method: "PUT",
        data,
        toastMessage: "Book has been updated successfully",
        onStart: requested.type,
        onSuccess: bookUpdated.type,
        onError: requestFailed.type,
      })
    );
  };
};

export const deleteBook = (id) => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: "/books/" + id,
        method: "DELETE",
        toastMessage: "Book has been deleted successfully",
        onStart: requested.type,
        onSuccess: bookDeleted.type,
        onError: requestFailed.type,
      })
    );
  };
};
