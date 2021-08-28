import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import { setAuthData } from "./store/auth";
import { booksAdded } from "./store/cart";
import configStore from "./store/configStore";

import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/index.css";

const store = configStore();

// Set auth state from local storage
store.dispatch(setAuthData());
// Set cartitems from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
store.dispatch(booksAdded(cartItems));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
