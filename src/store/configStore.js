import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import apiMiddleware from "./middlewares/api";
// Reducers
import cartReducer from "./cart";
import authReducer from "./auth";
import booksReducer from "./books";
import usersReducer from "./users";
import ordersReducer from "./orders";
import paymentsReducer from "./payments";
import statisticsReducer from "./statistics";
import categoriesReducer from "./categories";

const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  books: booksReducer,
  users: usersReducer,
  orders: ordersReducer,
  payments: paymentsReducer,
  statistics: statisticsReducer,
  categories: categoriesReducer,
});

function configStore() {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), apiMiddleware],
  });
}

export default configStore;
