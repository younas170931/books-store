import React from "react";
import { Input, Form, InputNumber } from "antd";

const { Item } = Form;

export default function InputComponent({
  name,
  placeholder,
  rules = [],
  type = "text",
  ...props
}) {
  if (type === "number") {
    return (
      <Item name={name} rules={rules}>
        <InputNumber placeholder={placeholder} {...props} />
      </Item>
    );
  }

  if (type === "password") {
    return (
      <Item name={name} rules={rules}>
        <Input.Password
          className="inputC"
          placeholder={placeholder}
          {...props}
        />
      </Item>
    );
  }

  if (type === "textarea") {
    return (
      <Item name={name} rules={rules}>
        <Input.TextArea
          className="inputC"
          placeholder={placeholder}
          {...props}
        />
      </Item>
    );
  }

  return (
    <Item name={name} rules={rules}>
      <Input className="inputC" placeholder={placeholder} {...props} />
    </Item>
  );
}
