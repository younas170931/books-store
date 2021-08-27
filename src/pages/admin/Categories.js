import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Spin, Modal } from "antd";

import * as actions from "../../store/categories";

function Categories({
  initialLoading,
  loading,
  loadCategories,
  categories,
  deleteCategory,
}) {
  const [state, setState] = useState({ showModal: false });

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = () => {
    deleteCategory(state.category._id);
    setState({ showModal: false });
  };

  if (initialLoading) {
    return (
      <div className="container mt-4 text-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 containerC-sm">
        <List
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Link
                  to={`/admin/categories/category-form?edit=true&id=${item._id}`}
                  key="edit"
                >
                  Edit
                </Link>,
                <span
                  key="delete"
                  className="cursor"
                  onClick={() => setState({ showModal: true, category: item })}
                >
                  Delete
                </span>,
              ]}
              className="list__item"
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image.url} />}
                title={item.title}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        title={state.category?.title}
        visible={state.showModal}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={() => setState({ showModal: false })}
      >
        <p>Ary you sure to delete this Category?</p>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    initialLoading: state.categories.initialLoading,
    loading: state.categories.loading,
    categories: state.categories.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(actions.loadCategories()),
    deleteCategory: (id) => dispatch(actions.deleteCategory(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
