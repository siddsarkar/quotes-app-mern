import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { AccountCircle, Favorite } from "@material-ui/icons";

//components
import { Loader } from "../../components";

//actions
import { getLikesForArticle } from "../../store/actions/likesActions";

class Likes extends Component {
  mounted = false;
  state = {
    loading: true,
  };
  cb = () => {
    this.mounted && this.setState({ loading: false });
  };
  uef = () => {
    const articleId = this.props.match.params.id;
    this.props.likers(articleId, this.cb);
  };

  componentDidMount() {
    this.mounted = true;
    this.uef();
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  render() {
    const { likes } = this.props;
    const { loading } = this.state;

    const id = this.props.match.params.id;
    return loading ? (
      <Loader />
    ) : (
      <>
        <div
          style={{
            margin: 10,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Likes on post {id}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", margin: 5 }}>
            <Favorite fontSize="small" />
            <Typography>{" " + likes.length}</Typography>
          </div>
        </div>
        <Container>
          <List>
            {likes.map((value) => {
              return (
                <Link
                  key={value.authorId}
                  style={{ textDecoration: "none" }}
                  to={"/article/" + value.authorId + "/articles"}
                >
                  <ListItem button>
                    <ListItemAvatar>
                      <AccountCircle color="secondary" />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography color="textPrimary">
                        {value.author}
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <Typography variant="caption" color="textSecondary">
                        {value.addedOn.split(".")[0].split("T")[0]}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  likes: state.likes.likes,
});

const mapDispatchToprops = (dispatch) => {
  return {
    likers: (id, cb) => dispatch(getLikesForArticle(id, cb)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Likes);
