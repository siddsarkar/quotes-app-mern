import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";

//actions
import {
  getAllArticles,
  getArticleByAuthor,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";

//components
import { TagsBar, MyCard, Loader, Paginate } from "../../components";
import { DataUsage, Flare, LabelImportant, Loyalty } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
    const { articles, tags, userId, username, loggedIn } = this.props;
    const { page, pageCount, isLoading } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      <>
        <TagsBar tags={tags} />
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item lg={2} xl={2} md={3} sm={4} xs={false}>
            <Hidden xsDown>
              <ListItem dense={true}>
                <ListItemAvatar>
                  <Avatar>{username.substr(0, 1).toUpperCase() || "X"}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    loggedIn ? (
                      username
                    ) : (
                      <Typography
                        style={{ textDecoration: "none" }}
                        component={Link}
                        to="/login"
                      >
                        Login/Signup
                      </Typography>
                    )
                  }
                  primaryTypographyProps={{ variant: "h5" }}
                  secondary={
                    <span>
                      <Typography variant="caption">
                        <DataUsage fontSize="inherit" />
                        {" " + Date().substr(0, 15)}
                      </Typography>
                    </span>
                  }
                />
              </ListItem>
              <List dense={true}>
                <ListItem>
                  <Flare style={{ marginRight: 10 }} />
                  <ListItemText primary="Highlights" />
                </ListItem>
                <ListItem>
                  <LabelImportant style={{ marginRight: 10 }} />
                  <ListItemText primary="Popular" />
                </ListItem>
                <ListItem>
                  <Loyalty style={{ marginRight: 10 }} />
                  <ListItemText primary="Trending" />
                </ListItem>
              </List>
            </Hidden>
          </Grid>
          <Grid
            item
            lg={8}
            xl={8}
            md={7}
            sm={8}
            xs={12}
            // style={{ backgroundColor: "lightblue" }}
          >
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
          </Grid>
          <Grid item lg={2} xl={2} md={1} sm={false} xs={false} />
        </Grid>
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
    username: state.users.authenticatedUsername,
    userId: state.users.userId,
    loggedIn: state.users.isAuthenticated,
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
