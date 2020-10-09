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
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid
            item
            lg={2}
            xl={2}
            md={3}
            sm={4}
            xs={0}
            // style={{ position: "relative" }}
          >
            <Hidden xsDown>
              <ListItem dense={true}>
                <ListItemAvatar>
                  <Avatar>S</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Siddhartha Sarkar"
                  secondary={
                    <span>
                      <Typography variant="caption">
                        <DataUsage fontSize="inherit" /> 19-02-2020
                      </Typography>
                    </span>
                  }
                />
              </ListItem>
              <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <Flare />
                  </ListItemIcon>
                  <ListItemText primary="Highlights" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LabelImportant />
                  </ListItemIcon>
                  <ListItemText primary="Popular" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Loyalty />
                  </ListItemIcon>
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
          <Grid item lg={2} xl={2} md={1} sm={0} xs={0} />
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
