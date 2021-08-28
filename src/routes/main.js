import {
  Home,
  Login,
  Register,
  Single,
  Checkout,
  Order,
  BookForm,
  Orders,
  Profile,
  Books,
  BecomeSeller,
  Callback,
  Success,
  Cancel,
  Revenue,
  PageNotFound,
  AllBooks,
  Categories,
} from "../pages";

const routes = [
  {
    title: "Home",
    path: "/",
    Component: Home,
    nav: {
      left: true,
    },
  },
  {
    title: "Books",
    path: "/books",
    Component: AllBooks,
    nav: {
      left: true,
    },
  },
  {
    title: "Categories",
    path: "/categories",
    Component: Categories,
    nav: {
      left: true,
    },
  },

  {
    title: "Login",
    path: "/login",
    Component: Login,
    nav: {
      left: false,
    },
    protect: {
      role: ["unAuth"],
    },
  },
  {
    title: "Register",
    path: "/register",
    Component: Register,
    nav: {
      left: false,
    },
    protect: {
      role: ["unAuth"],
    },
  },
  {
    title: "Become Seller",
    path: "/user/become-seller",
    Component: BecomeSeller,
    nav: {
      left: false,
    },
    protect: {
      role: ["user"],
    },
  },
  {
    title: "Add Book",
    path: "/books/book-form",
    Component: BookForm,
    nav: {
      left: false,
    },
    protect: {
      role: ["seller", "admin"],
    },
  },
  {
    title: "Single",
    path: "/books/:id",
    Component: Single,
  },

  {
    title: "Checkout",
    path: "/checkout",
    Component: Checkout,
    protect: {
      role: ["user", "seller", "admin"],
      redirect: "/login",
    },
  },
  {
    title: "Order",
    path: "/order",
    Component: Order,
    protect: {
      role: ["user", "seller"],
    },
  },
  {
    title: "User Orders",
    path: "/user/orders",
    Component: Orders,
    protect: {
      role: ["admin", "user", "seller"],
    },
  },
  {
    title: "user Profile",
    path: "/user/profile",
    Component: Profile,
    protect: {
      role: ["user", "seller", "admin"],
    },
  },
  {
    title: "user's Books",
    path: "/user/books",
    Component: Books,
    protect: {
      role: ["admin", "seller"],
    },
  },
  {
    title: "Payment Callback",
    path: "/payment/callback",
    Component: Callback,
    protect: {
      role: ["user"],
    },
  },
  {
    title: "Payment Success",
    path: "/payment/success",
    Component: Success,
    protect: {
      role: ["user", "seller"],
    },
  },
  {
    title: "Payment Cancel",
    path: "/payment/cancel",
    Component: Cancel,
    protect: {
      role: ["user", "seller"],
    },
  },
  {
    title: "Revenue",
    path: "/payment/revenue",
    Component: Revenue,
    protect: {
      role: ["admin", "seller"],
    },
  },
  {
    title: "Page Not found",
    path: "*",
    Component: PageNotFound,
  },
];

export default routes;
