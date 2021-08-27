import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import mainRoutes from "../routes/main";
import { Footer, Header, ProtectedRoute } from "../components";

const { Content } = Layout;

function Main({ user }) {
  return (
    <>
      <Header />
      <Content style={{ minHeight: "100vh", marginTop: 55 }}>
        <Switch>
          {mainRoutes.map((route) => {
            if (route.protect && !route.protect.role.includes("unAuth")) {
              return (
                <ProtectedRoute
                  user={user}
                  path={route.path}
                  role={route.protect.role}
                  redirect={route.protect.redirect}
                  component={route.Component}
                  key={route.title}
                  exact
                />
              );
            }
            return (
              <Route
                component={route.Component}
                path={route.path}
                key={route.title}
                exact
              />
            );
          })}
        </Switch>
      </Content>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Main);
