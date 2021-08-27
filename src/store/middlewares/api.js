import { toast } from "react-hot-toast";
import _ from "lodash";

import http from "../../api/client";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);

    const {
      url,
      method = "GET",
      data,
      toastMessage,
      onStart,
      onSuccess,
      onError,
    } = action.payload;

    if (onStart) dispatch({ type: onStart });

    try {
      const res = await http({ method, url, data });
      // General
      dispatch(actions.apiCallSuccess());
      // Specific
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: res.data });
      }
      // show Toast
      if (toastMessage) {
        toast.success(toastMessage);
      }
    } catch (error) {
      const errMsg =
        _.get(error, "response.data.data") ||
        "Network Error. Please try later again";

      // Show Error toast
      toast.error(errMsg);
      // General
      dispatch(actions.apiCallFailed(errMsg));
      // Specific
      if (onError) {
        dispatch({
          type: onError,
          payload: {
            message: errMsg,
            status: error.response?.status,
          },
        });
      }
    }
  };

export default api;
