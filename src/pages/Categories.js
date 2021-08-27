import React, { useEffect } from "react";
import { Spin } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Category } from "../components";
import * as actions from "../store/categories";

function Categories({ categories, loadCategories, initialLoading }) {
  useEffect(() => {
    loadCategories();
  }, []);

  if (initialLoading)
    return (
      <div className="text-center mt-header pt-4">
        <Spin />
      </div>
    );

  return (
    <div className="containerC" style={{ marginTop: 100 }}>
      <div className="row">
        {categories.map((category) => (
          <div
            className="col-sm-6 col-xs-12 col-md-4 col-lg-3"
            key={category._id}
          >
            <Link to={"/books?category[eq]=" + category._id}>
              <Category category={category} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialLoading: state.categories.initialLoading,
    categories: state.categories.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(actions.loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
