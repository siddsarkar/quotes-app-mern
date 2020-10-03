import {
  AppBar,
  CardActions,
  Chip,
  Container,
  useScrollTrigger,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyCard from "../../components/Card";
import Loader from "../../components/Loader";
import { getArticleByTags } from "../../store/actions/searchActions";

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

class TagsScreen extends Component {
  mounted = false;
  state = {
    loading: true,
    tags: ["love", "inspiration", "travel"],
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

  render() {
    const { articles, getTags } = this.props;
    const { loading } = this.state;
    return (
      <>
        <ElevationScroll {...this.props}>
          <AppBar
            position="sticky"
            // elevation={0}
            style={{ backgroundColor: "white" }}
          >
            <CardActions>
              {this.state.tags.map((tag, i) => (
                <Link
                  key={i}
                  style={{ textDecoration: "none" }}
                  to={"/tags/" + tag}
                >
                  <Chip
                    color={
                      this.props.match.params.tag === tag
                        ? "primary"
                        : "default"
                    }
                    clickable
                    onClick={() =>
                      this.setState(
                        this.setState({ loading: true }),
                        getTags(tag, 1, this.callback)
                      )
                    }
                    label={"#" + tag}
                  />
                </Link>
              ))}
            </CardActions>
          </AppBar>
        </ElevationScroll>
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
});

const mapDispatchToProps = (dispatch) => ({
  getTags: (tag, page, cb) => dispatch(getArticleByTags(tag, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsScreen);
