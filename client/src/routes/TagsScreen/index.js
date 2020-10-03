import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
import TagsBar from "../../components/TagsBar";
import { getArticleByTags } from "../../store/actions/searchActions";

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
    return (
      <>
        <TagsBar tags={tags} color={paramTag} onClick={this.handleClick} />
        <Container maxWidth="md" style={{ padding: 10 }}>
          {loading ? (
            <Loader />
          ) : (
            articles.map((item, index) => {
              return <MyCard key={item._id} item={item} />;
            })
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
