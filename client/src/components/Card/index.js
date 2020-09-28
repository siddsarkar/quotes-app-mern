import React, { Component } from "react";
import { Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import { AccountCircle, Favorite, Comment } from "@material-ui/icons";
import { connect } from "react-redux";
import { likeArticle } from "../../store/actions/likesActions";
class MyCard extends Component {
  render() {
    const { item } = this.props;
    return (
      <Card elevation={5} style={{ marginBottom: 10 }}>
        <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
          <CardContent style={{ paddingBottom: 0 }}>
            <Typography variant="h5" color="textPrimary" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2" color="textPrimary">
              {item.body}
            </Typography>
          </CardContent>{" "}
        </Link>
        <CardActions>
          <Link
            style={{ textDecoration: "none" }}
            to={"/article/" + item.authorId + "/articles"}
          >
            <Button
              style={{ textTransform: "none" }}
              color="secondary"
              size="small"
            >
              <AccountCircle style={{ marginRight: 5 }} />
              <Typography variant="subtitle1"> {item.author}</Typography>
            </Button>
          </Link>
          <div style={{ flexGrow: 1 }} />
          <Link
            style={{
              textDecoration: "none",
            }}
            to={"/article/" + item._id}
          >
            <Button style={{ textTransform: "none" }}>
              <Comment style={{ marginRight: 5 }} />
              <Typography>{item.commentsCount}</Typography>
            </Button>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/likes/" + item._id}>
            <Button color="secondary" style={{ textTransform: "none" }}>
              <Favorite style={{ marginRight: 5 }} />
              <Typography>{item.likesCount}</Typography>
            </Button>
          </Link>
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  username: state.users.username,
});

const mapDispatchToProps = (dispatch) => ({
  like: (id) => dispatch(likeArticle(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCard);

/** //to class comp
 * import React from "react";
import { Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import { Visibility, AccountCircle, Favorite } from "@material-ui/icons";

export default function MyCard({ item }) {
  const likeHandler = async () => {
    let res = await fetch("/api/likes/like/" + item._id, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
  };
  return (
    <Card elevation={5} style={{ marginBottom: 10 }}>
      <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
        <CardContent style={{ paddingBottom: 0 }}>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {item.body}
          </Typography>
        </CardContent>{" "}
      </Link>
      <CardActions>
        <Link
          style={{ textDecoration: "none" }}
          to={"/article/" + item.authorId + "/articles"}
        >
          <Button
            style={{ textTransform: "none" }}
            color="secondary"
            size="small"
          >
            <AccountCircle style={{ marginRight: 5 }} />
            <Typography variant="subtitle1"> {item.author}</Typography>
          </Button>
        </Link>
        <Button onClick={likeHandler}>
          <Typography>Like</Typography>
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/article/" + item._id}
        >
          <Button style={{ textTransform: "none" }}>
            <Visibility style={{ marginRight: 5 }} />
            <Typography>Comments</Typography>
          </Button>
        </Link>
        <Button color="secondary" style={{ textTransform: "none" }}>
          <Favorite style={{ marginRight: 5 }} />
          <Typography>{item.likesCount}</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
 */
