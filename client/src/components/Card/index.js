import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  Button,
  CardActions,
  makeStyles,
  Divider,
  CardMedia,
} from "@material-ui/core";
import {
  Schedule,
  AccountCircleOutlined,
  CommentOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import assetMapping from "../../assets/assetMapping.json";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
    border: 0,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  link: {
    ...theme.link,
    marginRight: theme.spacing(1),
    textTransform: "uppercase",
  },
  title: {
    ...theme.link,
    display: "block",
  },
  btn: {
    color: theme.palette.text.primary,
    textTransform: "none",
  },
  media: {
    height: 160,
  },
}));

export default function MyCard({ item, index }) {
  const classes = useStyles();
  return (
    <>
      {index === 0 && (
        <CardMedia
          className={classes.media}
          image="http://picsum.photos/600/160"
          placeholder={"loading"}
          title="Contemplative Reptile"
        />
      )}
      <Card elevation={0} className={classes.root}>
        {item.tags.map((tag, i) => {
          return (
            <Typography
              key={i}
              component={Link}
              to={"/tags/" + tag}
              className={classes.link}
              style={{ color: assetMapping.colors[tag] }}
              variant="caption"
            >
              #{tag}
            </Typography>
          );
        })}

        <Typography
          component={Link}
          to={"/article/" + item._id}
          variant="h4"
          color="textPrimary"
          className={classes.title}
        >
          {item.title}
        </Typography>

        <CardActions disableSpacing style={{ padding: 0, margin: 0 }}>
          <Button
            className={classes.btn}
            color="primary"
            component={Link}
            to={"/article/" + item.authorId + "/articles"}
            size="small"
            startIcon={<AccountCircleOutlined />}
          >
            <Typography color="textPrimary">{item.author}</Typography>
          </Button>

          <div style={{ flexGrow: 1 }} />
          <Button className={classes.btn} startIcon={<Schedule />} size="small">
            <Typography variant="caption" color="textPrimary">
              {item.addedOn.split(".")[0].split("T")[0]}
            </Typography>
          </Button>

          <Button
            component={Link}
            to={"/article/" + item._id}
            startIcon={<CommentOutlined />}
          >
            <Typography>{item.commentsCount}</Typography>
          </Button>

          <Button
            component={Link}
            color="secondary"
            to={"/article/" + item._id}
            startIcon={<FavoriteBorderOutlined />}
          >
            <Typography>{item.likesCount}</Typography>
          </Button>
        </CardActions>
      </Card>
      <Divider variant="fullWidth" />
    </>
  );
}
