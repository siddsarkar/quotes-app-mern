import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllArticles,
  getArticleByAuthor,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";
import {
  AppBar,
  CardActions,
  Chip,
  Container,
  useScrollTrigger,
} from "@material-ui/core";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate/Paginate";
import { Link } from "react-router-dom";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

class Articles extends Component {
  mounted = false;
  state = {
    isLoading: true,
    page: 1,
    pageCount: 0,
    tags: ["love", "inspiration", "travel"],
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
    const { articles } = this.props;
    const { page, pageCount } = this.state;
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <>
        {" "}
        <ElevationScroll {...this.props}>
          <AppBar position="sticky" style={{ backgroundColor: "white" }}>
            <CardActions>
              {this.state.tags.map((tag, i) => (
                <Link
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={"/tags/" + tag}
                >
                  <Chip clickable label={"#" + tag} />
                </Link>
              ))}
            </CardActions>
          </AppBar>
        </ElevationScroll>
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
