import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import RootNav from "./Navigation/RootNav";

export default function App(props) {
  return (
    <>
      <RootNav />
    </>
  );
}
