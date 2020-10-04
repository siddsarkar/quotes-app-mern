import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";

//actions
import {
  getAllArticles,
  getArticleByAuthor,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";

//components
import { TagsBar, MyCard, Loader, Paginate } from "../../components";

class Articles extends Component {
  mounted = false;
  state = {
    isLoading: true,
    page: 1,
    pageCount: 0,
  };

  cb = () => {
    this.mounted &&
      this.setState({
        pageCount: this.props.pageCount,
        isLoading: false,
      });
  };

  componentDidMount() {
    this.mounted = true;
    this.props.initArticles(this.cb, 1);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { articles, tags } = this.props;
    const { page, pageCount, isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <>
        <TagsBar tags={tags} />
        <Container maxWidth="md" style={{ padding: 10 }}>
          {articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <Paginate
          count={pageCount}
          page={page}
          change={(e, page) => {
            this.mounted &&
              this.setState(
                this.setState({ page: page, isLoading: true }),
                () => {
                  this.props.initArticles(this.cb, page);
                }
              );
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.articles.tags,
    pageCount: state.articles.pages,
    articles: state.articles.articles,
    comments: state.comments.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initArticles: (callback, page) => dispatch(getAllArticles(callback, page)),
    getComments: (id) => dispatch(getCommentsForArticle(id)),
    getautthorarticles: (id) => dispatch(getArticleByAuthor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
