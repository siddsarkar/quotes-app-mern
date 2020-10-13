import { Container, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";

//actions
import { getArticleByTags } from "../../store/actions/searchActions";

//components
import { MyCard, Loader, TagsBar } from "../../components";

class TagsScreen extends Component {
  mounted = false;
  state = {
    loading: true,
  };
  callback = () => {
    this.mounted && this.setState({ loading: false });
  };

  uef = () => {
    this.mounted && this.setState({ loading: true });
    let tag = this.props.match.params.tag;
    this.props.getTags(tag, 1, this.callback);
  };

  componentDidMount() {
    this.mounted = true;
    this.uef();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleClick = (tag) => {
    this.setState(
      this.setState({ loading: true }),
      this.props.getTags(tag, 1, this.callback)
    );
  };

  render() {
    const { articles, tags } = this.props;
    const { loading } = this.state;
    const paramTag = this.props.match.params.tag;
    return loading ? (
      <Loader />
    ) : (
      <>
        <TagsBar tags={tags} curTag={paramTag} onClick={this.handleClick} />
        <Container maxWidth="md" style={{ padding: 0 }}>
          {articles.length ? (
            articles.map((item, index) => {
              return <MyCard key={item._id} item={item} />;
            })
          ) : (
            <Typography style={{ textAlign: "center" }}>
              Sorry, No results
            </Typography>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  articles: state.search.articles,
  tags: state.articles.tags,
});

const mapDispatchToProps = (dispatch) => ({
  getTags: (tag, page, cb) => dispatch(getArticleByTags(tag, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsScreen);
