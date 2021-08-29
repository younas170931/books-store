import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../store/categories";

import { Books, Category, Hero } from "../components";

function Home({ categories, loading, loadCategories }) {
  useEffect(() => {
    loadCategories();
  }, []);

  const displayCategories = () => {
    const cats = [];
    for (let i = 0; i < categories.length; i++) {
      if (i === 4) {
        break;
      }

      cats.push(
        <div
          className="col-sm-6 col-xs-12 col-md-4 col-lg-3"
          key={categories[i]._id}
        >
          <Link to={"/books?category[eq]=" + categories[i]._id}>
            <Category category={categories[i]} />
          </Link>
        </div>
      );
    }
    return cats;
  };
  return (
    <>
      <Hero />
      <Books />
      <div className="containerC mt-4">
        <h3 className="mb-4 pb-4">Categories</h3>
        <div className="row">{displayCategories()}</div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.categories.loading,
    categories: state.categories.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCategories: () => dispatch(actions.loadCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
