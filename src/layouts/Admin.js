import React, { useState } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";

import adminRoutes from "../routes/admin";
import { Header as HeaderComponent, Sidebar } from "../components/admin";
import { ProtectedRoute } from "../components";

const { Content, Sider, Header } = Layout;

const styles = {
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    backgroundColor: "white",
    zIndex: 20,
  },
  sider: {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    zIndex: 11,
  },
  content: {
    minHeight: "100vh",
    padding: "15px 50px",
    marginTop: 64,
    marginLeft: 200,
  },
};

function Admin({ user }) {
  const [collapse, setCollapse] = useState(false);

  return (
    <Layout>
      <Header style={styles.header} className="antd-header-background">
        <HeaderComponent collapse={collapse} setCollapse={setCollapse} />
      </Header>
      <Sider
        theme="light"
        breakpoint="md"
        onBreakpoint={(b) => {
          setCollapse(b);
        }}
        collapsed={collapse}
        collapsedWidth="0"
        style={styles.sider}
      >
        <Sidebar />
      </Sider>
      <Content style={{ ...styles.content, marginLeft: collapse ? 0 : 200 }}>
        <Switch>
          {adminRoutes.map((route) => {
            if (route.children) {
              return route.children.map((childRout) => (
                <ProtectedRoute
                  user={user}
                  role="admin"
                  component={childRout.Component}
                  path={childRout.path}
                  key={childRout.title}
                  exact
                />
              ));
            }
            return (
              <ProtectedRoute
                user={user}
                role="admin"
                component={route.Component}
                path={route.path}
                key={route.title}
                exact
              />
            );
          })}
        </Switch>
      </Content>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Admin);
