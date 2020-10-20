import React, { useEffect, useState } from "react";
import { Button, Grid, Toolbar, Typography } from "@material-ui/core";

import { MyCard } from "../../../components";
import Selector from "./Selector";
import { Storage } from "@material-ui/icons";

function Sorter({ handleSort }) {
  return (
    <>
      <Toolbar component="div" variant="dense">
        <Button startIcon={<Storage />}>
          <Typography>POSTS</Typography>
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Selector handleSort={handleSort} />
      </Toolbar>
    </>
  );
}

export default function CenterPanel(props) {
  const {
    articles,
    page,
    pageCount,
    onPageChange,
    isLoading,
    handleSort,
  } = props;

  const [bottom, setBottom] = useState(false);

  //debug
  // const [scr, setScr] = useState(0);
  // const [h, setH] = useState(0);

  function handleScroll() {
    const sum = window.innerHeight + document.documentElement.scrollTop;

    //debug
    // setScr(sum);
    // setH(document.documentElement.offsetHeight);
    // console.log(
    //   `scroll:${sum}, total:${document.documentElement.offsetHeight}`
    // );

    const isBottom = sum >= document.documentElement.offsetHeight * (95 / 100);
    setBottom(isBottom);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    //debug
    // console.log(bottom);
    // if (bottom) {
    //   alert("bottomm recahed");
    // }

    if (!bottom || page >= pageCount) return;
    onPageChange(page);
  }, [bottom, page, pageCount, onPageChange]);

  const loader = () => {
    if (!isLoading && page === pageCount) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            No More Posts
          </Typography>
        </div>
      );
    } else if (isLoading) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            Loading...
          </Typography>
        </div>
      );
    } else if (!isLoading && page < pageCount) {
      return (
        <div style={{ display: "block", textAlign: "center" }}>
          <Typography color="textSecondary" variant="overline">
            Loading...
          </Typography>
        </div>
      );
    }
  };

  return (
    <>
      <Sorter handleSort={handleSort} />
      <Grid container direction="column" justify="center" alignItems="stretch">
        {/* debug */}
        {/* <Typography
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999999999999999999,
          }}
        >
          {"scr:" + scr + "height" + h}
        </Typography> */}
        {articles.map((item, index) => {
          return (
            <Grid key={item._id} item>
              <MyCard index={index} item={item} />
            </Grid>
          );
        })}
      </Grid>
      {/* <Paginate
        count={pageCount}
        page={page}
        change={(e, page) => props.onPageChange(page)}
      /> */}
      {loader()}
    </>
  );
}
