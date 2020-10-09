import { CardContent, Chip, Typography, Divider } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { Link } from "react-router-dom";
import "../../index.css";
import assetMapping from "../../assets/assetMapping.json";

export default function MarkedDown({ date, tags, title, body, children }) {
  return (
    // <Container maxWidth="md" style={{ padding: 0, position: "relative" }}>
    <>
      <CardContent>
        {tags.map((tag, i) => {
          return (
            <Link
              key={i}
              style={{ textDecoration: "none" }}
              to={"/tags/" + tag}
            >
              <Chip
                clickable
                // color="primary"
                label={"#" + tag}
                size="small"
                style={{
                  marginLeft: 5,
                  color: "#fff",
                  backgroundColor: assetMapping.colors[tag],
                }}
              />
            </Link>
          );
        })}
        <Typography color="textPrimary" variant="h3">
          {title || "Your title here"}
        </Typography>
        <Typography color="textSecondary" gutterBottom variant="caption">
          {date}
        </Typography>
        <Divider variant="fullWidth" />
        <ReactMarkdown
          className="markdown"
          source={body || `## use markdown or html \n goodluck!`}
          escapeHtml={false}
        />
      </CardContent>
      {children}
    </>
  );
}
