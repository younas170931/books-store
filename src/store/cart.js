import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import _, { toSafeInteger } from "lodash";

const slice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    booksAdded: function (cart, action) {
      cart.items = action.payload;
    },
    booksRemoved: function (cart, action) {
      cart.items = action.payload;
    },
    cartCleared: function (cart, action) {
      cart.items = [];
    },
  },
});

export default slice.reducer;

// Action Creators
export const { booksAdded, booksRemoved, cartCleared } = slice.actions;

export function addToCart(b) {
  const book = _.pick(b, ["_id", "title", "price", "images", "seller"]);
  return (dispatch, getState) => {
    const cartItems = [...getState().cart.items];
    // make sure user can buy books from same seller at a time
    const differentSellerBook = cartItems.find((i) => i.seller !== book.seller);
    if (differentSellerBook) {
      return toast.error("You can order books from one Seller at a time");
    }
    const index = cartItems.findIndex((item) => item._id === book._id);
    // if book is already in cart
    if (index > -1) {
      const updatedBook = { ...cartItems[index] };
      updatedBook.quantity++;
      cartItems[index] = updatedBook;
    } else {
      cartItems.push({ ...book, quantity: 1 });
    }
    dispatch(booksAdded(cartItems));

    saveCartItemsLocally(cartItems);
  };
}

export function removeFromCart(payload) {
  return (dispatch, getState) => {
    const cartItems = [...getState().cart.items];
    const index = cartItems.findIndex((item) => item._id === payload._id);
    // Delete book from cart completly
    if (payload.delete) {
      cartItems.splice(index, 1);
    } else {
      // Decrement book quantity
      const book = { ...cartItems[index] };

      if (book.quantity <= 1) return;

      book.quantity--;
      cartItems[index] = book;
    }

    dispatch(booksRemoved(cartItems));

    saveCartItemsLocally(cartItems);
  };
}

export function clearCart() {
  return (dispatch, getState) => {
    dispatch(cartCleared());

    saveCartItemsLocally([]);
  };
}

// Helper Functions
function saveCartItemsLocally(cartItems) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
