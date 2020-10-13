import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

//components
import { MyCard, Loader } from "../../components";

//actions
import { getArticleByAuthor } from "../../store/actions/articleActions";

class AuthorArticles extends Component {
  mounted = false;
  state = {
    isloading: true,
  };

  gotArticles = () => {
    this.mounted && this.setState({ isloading: false });
  };

  uef = () => {
    const id = this.props.match.params.authorId;
    this.props.getautthorarticles(id, this.gotArticles);
  };
  componentDidMount = () => {
    this.mounted = true;
    this.uef();
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  render() {
    const { articles } = this.props;
    const { isloading } = this.state;

    return isloading ? (
      <Loader />
    ) : (
      <>
        <Container maxWidth="md">
          <CardContent style={{ paddingBottom: 0 }}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Avatar style={{ height: 100, width: 100 }}>
                  {articles[0].author.substr(0, 1).toUpperCase()}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h4">{articles[0].author}</Typography>
                <Typography color="textSecondary" variant="h5">
                  {"@" + articles[0].author}
                </Typography>
                {/* <Typography variant="h6" color="textSecondary">
                      Joined: {Date().substr(0, 16)}
                    </Typography> */}
              </Grid>
            </Grid>
          </CardContent>
        </Container>
        <Container maxWidth="md" style={{ padding: 0 }}>
          <div style={{ textAlign: "center", marginLeft: 10 }}>
            <Typography color="textSecondary" variant="caption">
              Recent articles by {articles[0].author}
            </Typography>
          </div>
          {articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })}
        </Container>
        <div style={{ margin: 10, textAlign: "center" }}>
          <Typography color="textSecondary" variant="caption">
            Copyright@2020_Siddhartha Sarkar
          </Typography>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getautthorarticles: (id, cb) => dispatch(getArticleByAuthor(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorArticles);
