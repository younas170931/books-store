import React from "react";
import Icon from "../common/Icon";

export default function Header({ setCollapse, collapse }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <h5>Admin Panel</h5>
      <div onClick={() => setCollapse(!collapse)}>
        <Icon name="MenuOutlined" className="cursor" />
      </div>
    </div>
  );
}
