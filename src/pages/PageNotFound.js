import React from "react";
import { Icon } from "../components";

export default function PageNotFound() {
  return (
    <div className="container mt-header text-center pt-4">
      <Icon name="FrownOutlined" className="display-3 mb-2" />
      <h3>Page not found</h3>
    </div>
  );
}
