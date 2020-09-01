import React from "react";
import { Container, Card, Typography, Button } from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import { Link } from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";

export default function MyCard({ item }) {
  return (
    <Card elevation="5" key={item._id} style={{ margin: 10 }}>
      <CardContent>
        <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
          <Typography variant="h5" color="primary" gutterBottom>
            {item.title}
          </Typography>
        </Link>

        <Typography variant="body2" component="p">
          {item.body}
        </Typography>
      </CardContent>
      <CardActions style={{ position: "relative" }}>
        <Button color="primary" size="small">
          - {item.author}
        </Button>
        <Link style={{ textDecoration: "none" }} to={"/article/" + item._id}>
          <Button size="small" color="secondary">
            View Comments
          </Button>
        </Link>
        <Button
          color="textSecondary"
          style={{ right: 10, position: "absolute" }}
          size="small"
        >
          Like {" (7)"}
        </Button>
      </CardActions>
    </Card>
  );
}
