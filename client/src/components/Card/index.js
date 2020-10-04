import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { AccountCircle, Favorite, Comment } from "@material-ui/icons";

export default function MyCard({ item }) {
  return (
    <Card elevation={5} style={{ marginBottom: 10 }}>
      {item.tags.map((tag, i) => {
        return (
          <Link key={i} style={{ textDecoration: "none" }} to={"/tags/" + tag}>
            <Typography
              style={{ marginLeft: 10, marginTop: 5 }}
              variant="overline"
            >
              #{tag}
            </Typography>
          </Link>
        );
      })}
      <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
        <CardContent
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
        >
          <Typography variant="h4" color="textPrimary" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="body2" color="textPrimary">
            {item.body}
          </Typography>
        </CardContent>
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
            <Typography variant="subtitle1">{item.author}</Typography>
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
