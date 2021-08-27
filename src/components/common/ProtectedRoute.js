import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({
  user,
  role = ["user"],
  redirect = "/",
  path,
  component: Component,
  render,
  ...props
}) {
  if (!user || !role.includes(user.role)) {
    return <Redirect to={redirect} />;
  }

  return (
    <Route
      path={path}
      render={(props) => {
        return Component ? <Component {...props} /> : render(props);
      }}
      {...props}
    />
  );
}
