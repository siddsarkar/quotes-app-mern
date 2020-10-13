import { Chip, Typography, Divider } from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { Link } from "react-router-dom";
import "../../index.css";
import assetMapping from "../../assets/assetMapping.json";

export default function MarkedDown({ date, tags, title, body, children }) {
  return (
    <>
      {tags.map((tag, i) => {
        return (
          <Link key={i} style={{ textDecoration: "none" }} to={"/tags/" + tag}>
            <Chip
              variant="outlined"
              clickable
              label={"#" + tag}
              size="small"
              style={{
                marginLeft: 5,
                color: assetMapping.colors[tag] || "gray",
              }}
            />
          </Link>
        );
      })}
      <Typography color="textPrimary" variant="h3">
        {title || "Your post title"}
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="caption">
        {date}
      </Typography>
      <Divider variant="fullWidth" />
      <ReactMarkdown
        className="markdown"
        source={body || `# Use markdown or html \n Goodluck! \n`}
        escapeHtml={false}
      />
      {children}
    </>
  );
}
