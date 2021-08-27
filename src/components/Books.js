import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button, Spin } from "antd";

import * as actions from "../store/books";
import * as cartActions from "../store/cart";
import { Card } from ".";

function Books({
  books,
  loadBooks,
  loadMoreBooks,
  loading,
  initialLoading,
  pagination,
  addToCart,
}) {
  const location = useLocation();

  useEffect(() => {
    const query = location.search?.split("?")[1];
    loadBooks(query);
  }, [location]);

  const handleLoadMoreBooks = () => {
    let query = location.search?.split("?")[1];
    let nextPage = pagination.next.page;

    if (query) {
      query = `${query}&page=${nextPage}`;
    } else {
      query = `&page=${nextPage}`;
    }

    loadMoreBooks(query);
  };

  if (initialLoading)
    return (
      <div className="text-center mt-header pt-4">
        <Spin />
      </div>
    );

  if (!books?.length)
    return (
      <div className="text-center mt-header pt-4">
        <div className="lead">No books found</div>
      </div>
    );

  return (
    <div className="containerC mt-4">
      <div className="row">
        {books.map((book) => (
          <div className="col-sm-6 col-xs-12 col-md-4 col-lg-3" key={book._id}>
            <Card item={book} onAddToCart={() => addToCart(book)} />
          </div>
        ))}
      </div>
      <LoadMoreBtn />
    </div>
  );

  function LoadMoreBtn() {
    if (!pagination.next || !books?.length) return null;

    return (
      <div className="text-center mt-3">
        <Button
          type="primary"
          shape="round"
          size="large"
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
    addToCart: (b) => dispatch(cartActions.addToCart(b)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
