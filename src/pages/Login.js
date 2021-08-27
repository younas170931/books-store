import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button } from "antd";

import * as actions from "../store/auth";
import { Input } from "../components";
import { Redirect } from "react-router-dom";

const initialValues = { email: "murtaza@gmail.com", password: "password" };

const rules = {
  email: [
    {
      type: "email",
      required: true,
      message: "Please input your Email!",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      message: "Please enter your password. Minimum 6 characters",
    },
  ],
};

function Login({ login, loading, user, redirect, history }) {
  useEffect(() => {
    if (redirect) {
      history.replace(redirect);
    }
  }, [redirect, history]);

  const onFinish = (values) => {
    login(values);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="containerC-sm mt-4">
      <p className="h3 mb-3">Login</p>
      <Form name="basic" initialValues={initialValues} onFinish={onFinish}>
        <Input name="email" rules={rules.email} placeholder="Email" />
        <Input
          type="password"
          name="password"
          rules={rules.password}
          placeholder="Email"
        />

        <Button
          type="primary"
          htmlType="submit"
          block
          shape="round"
          size="large"
          className="mt-1"
          loading={loading}
        >
          Log in
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    redirect: state.auth.redirect,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(actions.login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
