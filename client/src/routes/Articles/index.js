import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
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

function RightPanel(props) {
  return null;
}

function LeftPanel({ username, loggedIn }) {
  return (
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
  );
}

function CenterPanel(props) {
  const { articles, page, pageCount } = props;
  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch">
        {articles.map((item, index) => {
          return (
            <Grid key={item._id} item>
              <MyCard index={index} item={item} />
            </Grid>
          );
        })}
      </Grid>
      <Paginate
        count={pageCount}
        page={page}
        change={(e, page) => props.onPageChange(page)}
      />
    </>
  );
}

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

  onPageChange = (page) => {
    this.mounted &&
      this.setState(this.setState({ page: page, isLoading: true }), () => {
        this.props.initArticles(this.cb, page);
      });
  };

  render() {
    const { articles, tags, username, loggedIn } = this.props;
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
          <Grid
            item
            lg={3}
            xl={2}
            md={3}
            sm={4}
            xs={false}
            // style={{ backgroundColor: "lightpink" }}
          >
            <LeftPanel username={username} loggedIn={loggedIn} />
          </Grid>
          <Grid
            item
            lg={6}
            xl={8}
            md={7}
            sm={8}
            xs={12}
            // style={{ backgroundColor: "lightcoral" }}
          >
            <CenterPanel
              articles={articles}
              page={page}
              pageCount={pageCount}
              onPageChange={this.onPageChange}
            />
          </Grid>
          <Grid
            item
            lg={3}
            xl={2}
            md={1}
            sm={false}
            xs={false}
            // style={{ backgroundColor: "lightcyan" }}
          >
            <RightPanel />
          </Grid>
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
