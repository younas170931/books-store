import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./api";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    requested: function (statistics, action) {
      statistics.loading = true;
      statistics.error = null;
    },
    statisticsLoaded: function (statistics, action) {
      statistics.loading = false;
      statistics.data = action.payload;
    },
    requestFailed: function (statistics, action) {
      statistics.loading = false;
      statistics.error = action.payload;
    },
  },
});

export default slice.reducer;

// Action creators
const { requested, requestFailed, statisticsLoaded } = slice.actions;

const endpoint = "/statistics";

export const loadStatistics = () => {
  return (dispatch) => {
    dispatch(
      apiCallBegan({
        url: endpoint,
        onStart: requested.type,
        onSuccess: statisticsLoaded.type,
        onError: requestFailed.type,
      })
    );
  };
};
