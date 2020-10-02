import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, InputBase, Container } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { getArticleBySearch } from "../../store/actions/searchActions";
import MyCard from "../../components/Card";
import Paginate from "../../components/Paginate/Paginate";
import Loader from "../../components/Loader";

import "../../index.css";

class SearchPage extends Component {
  state = {
    query: "",
    page: 1,
  };
  cb = () => console.log("result");
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(this.state.query, 1, this.cb);
  };

  render() {
    const { articles, loading, pageCount } = this.props;
    const { query, page } = this.state;
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="search">
            <div className="searchIcon">
              <Search />
            </div>
            <InputBase
              type="search"
              autoFocus={true}
              placeholder="Type something to search.."
              classes={{
                root: "inputRoot",
                input: "inputInput",
              }}
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => this.setState({ query: e.target.value })}
            />
          </div>
        </form>

        <Container maxWidth="md" style={{ padding: 10 }}>
          {loading ? (
            <Loader />
          ) : (
            articles.map((item, index) => {
              return <MyCard key={item._id} item={item} />;
            })
          )}
        </Container>

        {pageCount > 1 ? (
          <Paginate
            count={pageCount}
            page={page}
            change={(e, page) => {
              this.setState(
                this.setState({ page }),
                this.props.search(query, page, this.cb)
              );
            }}
          />
        ) : (
          <Paginate onlyFooter={true} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.search.articles,
    pageCount: state.search.pages,
    loading: state.search.fetching,
  };
};
const mapDispatchToProps = (dispatch) => ({
  search: (query, page, cb) => dispatch(getArticleBySearch(query, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
