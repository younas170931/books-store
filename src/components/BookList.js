import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Button, Spin, Modal } from "antd";

import * as actions from "../store/books";

function BookList({
  showAll = false,
  user,
  books,
  loading,
  initialLoading,
  loadBooks,
  loadMoreBooks,
  deleteBook,
  pagination,
}) {
  const [state, setState] = useState({ showModal: false });

  useEffect(() => {
    let query = `seller[eq]=${user._id}`;
    if (showAll) {
      query = "";
    }
    loadBooks(query);
  }, []);

  useEffect(() => {
    if (!loading && state.showModal) {
      setState({ showModal: false });
    }
  }, [loading]);

  const handleLoadMoreBooks = () => {
    const nextPage = pagination.next.page;
    let query = `seller[eq]=${user._id}&page=${nextPage}`;
    if (showAll) {
      query = `page=${nextPage}`;
    }
    loadMoreBooks(query);
  };

  const handleDelete = () => {
    deleteBook(state.book._id);
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
        dataSource={books}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Link to={`/books/book-form?edit=true&id=${item._id}`} key="edit">
                Edit
              </Link>,
              <span
                key="delete"
                className="cursor"
                onClick={() => setState({ showModal: true, book: item })}
              >
                Delete
              </span>,
            ]}
            className="list__item"
          >
            <List.Item.Meta
              avatar={<Avatar src={item.images[0].url} />}
              title={item.title}
              description={"Book description"}
            />
          </List.Item>
        )}
      />
      <Modal
        title={state.book?.title}
        visible={state.showModal}
        onOk={handleDelete}
        confirmLoading={loading}
        onCancel={() => setState({ showModal: false })}
      >
        <p>Ary you sure to delete this book?</p>
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
    books: state.books.list,
    loading: state.books.loading,
    initialLoading: state.books.initialLoading,
    pagination: state.books.pagination,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: (q) => dispatch(actions.loadBooks(q)),
    loadMoreBooks: (q) => dispatch(actions.loadMoreBooks(q)),
    deleteBook: (id) => dispatch(actions.deleteBook(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
