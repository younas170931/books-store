import { useEffect } from "react";
import { connect } from "react-redux";
import { Form, Button, Select, Spin } from "antd";
import _ from "lodash";

import { provinces } from "../../constants";
import * as actions from "../../store/auth";
import { Input } from "../../components";

const { Item } = Form;
const { Option } = Select;

const initialValues = {
  name: "",
  email: "",
  address: "",
  city: "",
  province: "",
  phoneNo: "",
};

const rules = getRules();

function Profile({ updateDetails, getDetails, loading, initialLoading, user }) {
  const [form] = Form.useForm();

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    populateUser();
  }, [user, initialLoading]);

  const onFinish = (values) => {
    const userInfo = _.pick(values, ["name", "email", "phoneNo"]);
    const address = _.pick(values, ["address", "city", "province"]);
    updateDetails({ ...userInfo, address });
  };

  const populateUser = () => {
    if (!initialLoading && user) {
      const address = user.address || {};
      let userData = _.pick(user, ["name", "email", "phoneNo"]);
      userData.address = address.address;
      userData.city = address.city;
      userData.province = address.province;
      form.setFieldsValue(userData);
    }
  };

  if (initialLoading)
    return (
      <div className="container text-center mt-header pt-4">
        <Spin />
      </div>
    );

  return (
    <div className="containerC-sm mt-4 mb-4">
      <p className="h3 mb-3">Update Profile</p>
      <Form initialValues={initialValues} onFinish={onFinish} form={form}>
        <Input
          name="name"
          rules={rules.name}
          className="inputC"
          placeholder="Full Name"
        />
        <Input name="email" rules={rules.email} placeholder="Email" />
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

        <Item name="province" rules={rules.province}>
          <Select placeholder="select your province">
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
          Update
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    initialLoading: state.auth.initialLoading,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateDetails: (data) => dispatch(actions.updateDetails(data)),
    getDetails: () => dispatch(actions.getUserDetails()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

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
