import { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Select } from "antd";
import _ from "lodash";

import { provinces } from "../constants";
import * as actions from "../store/auth";
import { Input } from "../components";

const { Item } = Form;
const { Option } = Select;

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
  city: "",
  province: "",
  phoneNo: "",
};

const rules = getRules();

function Register({ register, loading, user, redirect, ...props }) {
  useEffect(() => {
    if (redirect) {
      props.history.replace(redirect);
    }
  }, [redirect]);

  if (user) {
    return <Redirect to="/" />;
  }

  const onFinish = (values) => {
    const userInfo = _.pick(values, ["name", "email", "password", "phoneNo"]);
    const address = _.pick(values, ["address", "city", "province"]);
    register({ ...userInfo, address });
  };

  return (
    <div className="containerC-sm mt-4 mb-4">
      <p className="h3 mb-3">Register</p>
      <Form initialValues={initialValues} onFinish={onFinish}>
        <Input
          name="name"
          rules={rules.name}
          className="inputC"
          placeholder="Full Name"
        />
        <Input name="email" rules={rules.email} placeholder="Email" />
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Input
              type="password"
              name="password"
              rules={rules.password}
              placeholder="Password"
            />
          </div>
          <div className="col-sm-12 col-md-6">
            <Input
              type="password"
              name="confirmPassword"
              rules={rules.confirmPassword}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <Input name="address" rules={rules.address} placeholder="Address" />
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <Input name="city" rules={rules.city} placeholder="City Name" />
          </div>
          <div className="col-sm-12 col-md-6">
            <Input
              name="phoneNo"
              rules={rules.phoneNo}
              placeholder="Phone Number"
            />
          </div>
        </div>

        <p>Province*</p>
        <Item name="province" rules={rules.province}>
          <Select className="inputC">
            {provinces.map((province) => (
              <Option value={province.value} key={province.label}>
                {province.label}
              </Option>
            ))}
          </Select>
        </Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          shape="round"
          size="large"
          className="mt-1"
          loading={loading}
        >
          Register
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
    register: (data) => dispatch(actions.register(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

function getRules() {
  return {
    name: [
      {
        required: true,
        message: "Please enter your Name!",
      },
    ],
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
    confirmPassword: [
      {
        required: true,
        message: "Please re-enter your password",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("Passwords that you entered do not match!")
          );
        },
      }),
    ],
    address: [
      {
        required: true,
        message: "Please input your Address",
      },
    ],
    city: [
      {
        required: true,
        min: 6,
        message: "Please enter your City Name",
      },
    ],
    province: [
      {
        required: true,
        message: "Please select your province name",
      },
    ],
    phoneNo: [
      {
        required: true,
        message: "Please input your Phone Number!",
      },
    ],
  };
}
