import React, { useEffect, useState } from "react";
import { Menu, Layout, Drawer, Badge } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../styles/Header.css";

import LogoImage from "../assets/images/Logo.png";
import * as actions from "../store/auth";
import mainRoutes from "../routes/main";
import Cart from "./Cart";
import Icon from "./common/Icon";

const { Header, Sider } = Layout;
const { SubMenu, Item } = Menu;

function HeaderMain({ auth, cart, logout }) {
  const [current, setCurrent] = useState("/home");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showMobDrawer, setShowMobDrawer] = useState(false);
  const [showDesktopMenu, setshowDesktopMenu] = useState(true);

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [window.location.pathname]);

  const handleLogout = () => {
    logout();
    document.location.href = "/";
    localStorage.removeItem("token");
  };

  const cartItemsCount = () => {
    const cartItems = cart?.items || [];
    let count = 0;
    cartItems.forEach((item) => {
      count += item.quantity;
    });
    return count;
  };

  const user = (auth && auth.user) || { role: "" };

  return (
    <>
      <Header className="antd-header d-flex width-full justify-content-between position-fixed top-0 start-0 z-index-5">
        <div className="site-logo">
          <Link to="/">
            <img src={LogoImage} alt="logo" className="logo" />
          </Link>
        </div>
        <Menu
          onClick={(e) => setCurrent(e.key)}
          mode="horizontal"
          className="flex-fill"
          selectedKeys={[current]}
        >
          {showDesktopMenu && navRoutes(mainRoutes, user, true)}
        </Menu>

        <Menu
          onClick={(e) => setCurrent(e.key)}
          mode="horizontal"
          className="flex-fill justify-content-end"
          selectedKeys={[current]}
        >
          {showDesktopMenu && navRoutes(mainRoutes, user, false)}

          <Item
            key="/cart"
            onClick={() => setDrawerVisible(true)}
            style={{ padding: "0 8px" }}
          >
            <Badge count={cartItemsCount()}>
              <Icon name="ShoppingCartOutlined" style={{ fontSize: 19 }} />
            </Badge>
          </Item>

          {user && user.role ? (
            <SubMenu
              icon={<Icon name="UserOutlined" style={{ fontSize: 18 }} />}
              key="/user"
              style={{ padding: "0 10px" }}
            >
              <Item key="/user/profile" onClick={(e) => setCurrent(e.key)}>
                <Link to="/user/profile">Profile</Link>
              </Item>
              <Item key="/user/orders" onClick={(e) => setCurrent(e.key)}>
                <Link to="/user/orders">Orders</Link>
              </Item>
              {user && ["seller", "admin"].includes(user.role) && (
                <>
                  <Item key="/user/books" onClick={(e) => setCurrent(e.key)}>
                    <Link to="/user/books">Books</Link>
                  </Item>
                  <Item
                    key="/payment/revenue"
                    onClick={(e) => setCurrent(e.key)}
                  >
                    <Link to="/payment/revenue">Revenue</Link>
                  </Item>
                </>
              )}
              <Item key="/logout" onClick={handleLogout}>
                Logout
              </Item>
            </SubMenu>
          ) : null}
        </Menu>
        <div className="menu-icon" onClick={() => setShowMobDrawer(true)}>
          <Icon name="MenuOutlined" />
        </div>
      </Header>

      <Drawer
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={320}
        bodyStyle={{ padding: 0 }}
        closeIcon={<Icon name="CloseOutlined" />}
        drawerStyle={{ backgroundColor: "#f8f8f8" }}
      >
        <Icon
          name="CloseOutlined"
          className="p-2 fs-5 cursor"
          onClick={() => setDrawerVisible(false)}
        />
        <Cart onCloseDrawer={() => setDrawerVisible(false)} />
      </Drawer>

      <Sider
        breakpoint="md"
        onBreakpoint={(broken) => {
          if (broken) {
            setshowDesktopMenu(false);
          } else {
            setshowDesktopMenu(true);
          }
        }}
      >
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setShowMobDrawer(false)}
          visible={showMobDrawer}
          width={200}
          bodyStyle={{ padding: 0 }}
          drawerStyle={{ backgroundColor: "#f8f8f8" }}
        >
          <Menu
            onClick={(e) => setCurrent(e.key)}
            mode="vertical"
            theme="light"
            selectedKeys={[current]}
            className="width-full"
          >
            {navRoutes(mainRoutes, user, null, true)}
          </Menu>
        </Drawer>
      </Sider>
    </>
  );

  function navRoutes(routes, user, left, bothSide = false) {
    return routes.map((route) => {
      if ((route.nav && route.nav.left === left) || (route.nav && bothSide)) {
        // if route is protected
        if (route.protect) {
          // if route is only for anauthenticated user
          if (route.protect.role.includes("unAuth")) {
            if (!user.role) {
              return (
                <Item key={route.path}>
                  <Link to={route.path}>{route.title}</Link>
                </Item>
              );
            }
            return null;
          }
          // route for authencated users based on thier role
          if (route.protect.role.includes(user.role)) {
            return (
              <Item key={route.path}>
                <Link to={route.path}>{route.title}</Link>
              </Item>
            );
          }
          return null;
        }
        return (
          <Item key={route.path}>
            <Link to={route.path}>{route.title}</Link>
          </Item>
        );
      }

      return null;
    });
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.loggedOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMain);
