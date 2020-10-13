import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Typography } from "@material-ui/core";
import "../../index.css";

//actions
import { getArticleBySearch } from "../../store/actions/searchActions";

//components
import { MyCard, Loader } from "../../components";

class Search extends Component {
  mounted = false;
  state = {
    query: "",
    page: 1,
  };

  cb = () => this.setState({ loading: false });

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
    const { articles, loading } = this.props;
    return (
      <>
        <Container maxWidth="md" style={{ padding: 0 }}>
          {loading ? (
            <Loader />
          ) : articles.length > 0 ? (
            articles.map((item, index) => {
              return <MyCard key={item._id} item={item} />;
            })
          ) : (
            <div
              style={{
                margin: 10,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography>Sorry, No results</Typography>
            </div>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.search.articles,
  // pageCount: state.search.pages,
  loading: state.search.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  search: (query, page, cb) => dispatch(getArticleBySearch(query, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
