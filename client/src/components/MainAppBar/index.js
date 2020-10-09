import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  makeStyles,
  fade,
  InputBase,
  Menu,
  MenuItem,
  Typography,
  Hidden,
} from "@material-ui/core";
import {
  AccountCircle,
  Create,
  History,
  Home,
  Search,
} from "@material-ui/icons";
import { getArticleBySearch } from "../../store/actions/searchActions";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function MainAppBar(props) {
  const ref = useRef();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  // const preventDefault = (event) => event.preventDefault();

  const call = () => console.log("got");

  return (
    <AppBar position="relative" color="primary" style={{ zIndex: 99999 }}>
      <Toolbar className={classes.root} variant="dense" disableGutters>
        <IconButton color="inherit" to="/" component={Link}>
          <Home />
        </IconButton>
        <div className={classes.search}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              history.push("/search");
              props.search(searchInput, 1, call);
              setSearchInput("");
              ref.current.blur();
            }}
          >
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchInput}
              inputRef={ref}
              type="search"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
        <Hidden xsDown>
          <Typography>
            {props.isLoggedin ? "Hi, " + props.username : null}
          </Typography>
        </Hidden>
        <div style={{ flexGrow: 1 }} />
        {props.isLoggedin ? (
          <>
            <IconButton to="/addarticle" component={Link} color="inherit">
              <Create />
            </IconButton>
            <IconButton color="inherit" to="/myarticles" component={Link}>
              <History />
            </IconButton>
            <div>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                style={{ zIndex: 9999999 }}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleClose && props.logout}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <Button to="/login" component={Link} color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
  username: state.users.authenticatedUsername,
});
const mapDispatchToProps = (dispatch) => ({
  search: (query, page, cb) => dispatch(getArticleBySearch(query, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
