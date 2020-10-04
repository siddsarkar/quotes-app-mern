import React, { Component } from "react";
import { connect } from "react-redux";
import { InputBase, Container } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import "../../index.css";

//actions
import { getArticleBySearch } from "../../store/actions/searchActions";

//components
import { Paginate, MyCard, Loader } from "../../components";

class Search extends Component {
  mounted = false;
  state = {
    query: "",
    page: 1,
  };

  cb = () => console.log("received");

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.search(this.state.query, 1, this.cb);
  };

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { articles, loading, pageCount } = this.props;
    const { query, page } = this.state;
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
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
              this.mounted &&
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

const mapStateToProps = (state) => ({
  articles: state.search.articles,
  pageCount: state.search.pages,
  loading: state.search.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  search: (query, page, cb) => dispatch(getArticleBySearch(query, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
