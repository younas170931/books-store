import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Spin, Modal } from "antd";

import * as actions from "../../store/users";
import { Icon } from "../../components";

function BookList({
  users,
  loading,
  initialLoading,
  loadUsers,
  loadMoreUsers,
  deleteUser,
  pagination,
}) {
  const [state, setState] = useState({ showModal: false });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (!loading && state.showModal) {
      setState({ showModal: false });
    }
  }, [loading]);

  const handleLoadMoreBooks = () => {
    const query = `page=${pagination.next.page}`;

    loadMoreUsers(query);
  };

  const handleDelete = () => {
    deleteUser(state.user._id);
    setState({ showModal: false });
  };

  if (initialLoading) {
    return (
      <div className="text-center mt-4">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <List
        loadMore={<LoadMoreBtn />}
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(user) => (
          <List.Item
            actions={[
              <span
                key="delete"
                className="cursor"
                onClick={() => setState({ showModal: true, user })}
              >
                Delete
              </span>,
            ]}
            className="list__item"
          >
            <List.Item.Meta
              avatar={<Avatar icon={<Icon name="UserOutlined" />} />}
              title={user.name}
              description={
                <div>
                  <span className="me-3">{user.email} </span>
                  <strong>{user.role} </strong>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Modal
        title={state.user?.email}
        visible={state.showModal}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={() => setState({ showModal: false })}
      >
        <p>Ary you sure to delete this User?</p>
      </Modal>
    </>
  );

  function LoadMoreBtn() {
    if (!pagination.next) return null;

    return (
      <div className="text-center mt-3">
        <Button
          type="primary"
          shape="round"
          loading={loading}
          disabled={loading}
          onClick={handleLoadMoreBooks}
        >
          Load More
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.users.list,
    loading: state.users.loading,
    initialLoading: state.users.initialLoading,
    pagination: state.users.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadUsers: (q) => dispatch(actions.loadUsers(q)),
    loadMoreUsers: (q) => dispatch(actions.loadMoreUsers(q)),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
