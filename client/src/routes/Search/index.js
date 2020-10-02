import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  makeStyles,
  fade,
  InputBase,
  Container,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { getArticleBySearch } from "../../store/actions/searchActions";
import MyCard from "../../components/Card";
import Paginate from "../../components/Paginate/Paginate";
import Loader from "../../components/Loader";

const useStyles = makeStyles((theme) => ({
  search: {
    margin: 10,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginBottom: 0,
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
    width: "90%",
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

function SearchPage(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [page, setPage] = React.useState(1);

  const cb = () => console.log("object");
  const handleSubmit = (data) => {
    data.preventDefault();
    props.search(query, 1, cb);
  };

  useEffect(() => {
    setChecked(true);
  }, []);

  const { articles } = props;
  const { pageCount } = props;
  return (
    <>
      <Collapse in={checked}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              type="search"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
        </form>
      </Collapse>

      <Container maxWidth="md" style={{ padding: 10 }}>
        {props.loading ? (
          <Loader />
        ) : (
          articles.map((item, index) => {
            return <MyCard key={item._id} item={item} />;
          })
        )}
      </Container>

      {pageCount > 1 ? (
        <Paginate
          count={pageCount}
          page={page}
          change={(e, page) => {
            props.search(query, page, cb);
            setPage(page);
          }}
        />
      ) : (
        <Paginate onlyFooter={true} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    articles: state.search.articles,
    pageCount: state.search.pages,
    loading: state.search.fetching,
  };
};
const mapDispatchToProps = (dispatch) => ({
  search: (query, page, cb) => dispatch(getArticleBySearch(query, page, cb)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
