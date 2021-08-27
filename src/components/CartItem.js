import React from "react";
import { List, Avatar } from "antd";

import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Item } = List;

const styles = {
  delete: { marginRight: 8, color: "red", cursor: "pointer" },
  icon: { cursor: "pointer" },
  item: {
    paddingBottom: 4,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
};

export default function CartItem({
  title,
  price,
  quantity,
  thumbnail,
  onIncrement,
  onDecrement,
  onDelete,
}) {
  return (
    <Item style={styles.item}>
      <List.Item.Meta
        avatar={<Avatar size="large" src={thumbnail} />}
        title={title}
        description={<CartItemCta price={price} />}
      />
    </Item>
  );

  function CartItemCta() {
    return (
      <div className="d-flex justify-content-between">
        <span>${price}</span>
        <div className="fs-6">
          <DeleteOutlined style={styles.delete} onClick={onDelete} />
          <MinusCircleOutlined style={styles.icon} onClick={onDecrement} />
          <span className="p-1">{quantity}</span>
          <PlusCircleOutlined style={styles.icon} onClick={onIncrement} />
        </div>
      </div>
    );
  }
}
