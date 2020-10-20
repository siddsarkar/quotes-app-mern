import React, { Component, useEffect, useState } from "react";
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
  clearArticles,
} from "../../store/actions/articleActions";
import { getCommentsForArticle } from "../../store/actions/commentActions";

//components
import { TagsBar, MyCard } from "../../components";
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
  const { articles, page, pageCount, onPageChange, isLoading } = props;

  const [bottom, setBottom] = useState(false);
  //debug
  // const [scr, setScr] = useState(0);
  // const [h, setH] = useState(0);

  function handleScroll() {
    const sum = window.innerHeight + document.documentElement.scrollTop;

    //debug
    // setScr(sum);
    // setH(document.documentElement.offsetHeight);
    // console.log(
    //   `scroll:${sum}, total:${document.documentElement.offsetHeight}`
    // );

    const isBottom = sum >= document.documentElement.offsetHeight * (95 / 100);
    setBottom(isBottom);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    //debug
    // console.log(bottom);
    // if (bottom) {
    //   alert("bottomm recahed");
    // }

    if (!bottom || page >= pageCount) return;
    onPageChange(page);
  }, [bottom, page, pageCount, onPageChange]);

  const loader = () => {
    if (!isLoading && page === pageCount) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            No More Posts
          </Typography>
        </div>
      );
    } else if (isLoading) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            Loading...
          </Typography>
        </div>
      );
    } else if (!isLoading && page < pageCount) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            Loading...
          </Typography>
        </div>
      );
    }
  };

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch">
        {/* debug */}
        {/* <Typography
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999999999999999999,
          }}
        >
          {"scr:" + scr + "height" + h}
        </Typography> */}
        {articles.map((item, index) => {
          return (
            <Grid key={item._id} item>
              <MyCard index={index} item={item} />
            </Grid>
          );
        })}
      </Grid>
      {/* <Paginate
        count={pageCount}
        page={page}
        change={(e, page) => props.onPageChange(page)}
      /> */}
      {loader()}
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
    this.props.clearArticles();
    this.mounted = false;
  }

  onPageChange = (page) => {
    console.log("getting page %d", page + 1);
    this.mounted &&
      this.setState(
        this.setState((prevState) => ({
          page: page + 1,
          isLoading: true,
        })),
        () => {
          this.props.initArticles(this.cb, page + 1);
        }
      );
  };

  render() {
    const { articles, tags, username, loggedIn } = this.props;
    const { page, pageCount, isLoading } = this.state;
    return (
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
              isLoading={isLoading}
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
    clearArticles: () => dispatch(clearArticles()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
