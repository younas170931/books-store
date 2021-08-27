import {
  Home,
  CategoryForm,
  Categories,
  Books,
  Orders,
  Users,
} from "../pages/admin";
import { Icon } from "../components";

const routes = [
  {
    title: "Dashboard",
    path: "/admin",
    Icon: <Icon name="AppstoreOutlined" />,
    Component: Home,
    nav: true,
  },
  {
    title: "Books",
    path: "/admin/books",
    Icon: <Icon name="ReadOutlined" />,
    Component: Books,
    nav: true,
  },
  {
    title: "Categories",
    Icon: <Icon name="GoldOutlined" />,
    nav: true,
    children: [
      {
        title: "Add Category",
        path: "/admin/categories/category-form",
        Icon: <Icon name="PlusCircleOutlined" />,
        Component: CategoryForm,
      },
      {
        title: "All Categories",
        path: "/admin/categories",
        Icon: <Icon name="GoldOutlined" />,
        Component: Categories,
      },
    ],
  },
  {
    title: "Orders",
    path: "/admin/orders",
    Icon: <Icon name="SolutionOutlined" />,
    Component: Orders,
    nav: true,
  },
  {
    title: "Users",
    path: "/admin/users",
    Icon: <Icon name="TeamOutlined" />,
    Component: Users,
    nav: true,
  },
];

export default routes;
