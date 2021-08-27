import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";

import adminRoutes from "../../routes/admin";

const { Item, SubMenu } = Menu;

export default function Sidebar() {
  return (
    <Menu
      mode="inline"
      theme="light"
      defaultSelectedKeys={["1"]}
      style={{ marginTop: 64 }}
    >
      {adminRoutes.map((route) => {
        if (route.nav) {
          if (route.children) {
            return (
              <SubMenu
                key={route.path || route.title}
                icon={route.Icon}
                title={route.title}
              >
                {route.children.map((childRoute) => (
                  <Item key={childRoute.path} icon={childRoute.Icon}>
                    <Link to={childRoute.path}>{childRoute.title}</Link>
                  </Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Item key={route.title || route.path} icon={route.Icon}>
              <Link to={route.path}>{route.title}</Link>
            </Item>
          );
        }
        return null;
      })}
    </Menu>
  );
}
