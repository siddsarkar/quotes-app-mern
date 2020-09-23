import React from "react";
import { Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import { Visibility, AccountCircle } from "@material-ui/icons";

export default function MyCard({ item }) {
  return (
    <Card elevation={5} style={{ margin: 10 }}>
      <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" gutterBottom>
            {item.title}
          </Typography>

          <Typography variant="body2" color="textPrimary" component="p">
            {item.body}
          </Typography>
        </CardContent>
      </Link>

      <CardActions style={{ position: "relative" }}>
        <Link
          style={{ textDecoration: "none" }}
          to={"/article/" + item.authorId + "/articles"}
        >
          <Button
            style={{ textTransform: "none" }}
            color="primary"
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
            <Visibility style={{ marginRight: 5 }} />
            <Typography>Comments</Typography>
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
