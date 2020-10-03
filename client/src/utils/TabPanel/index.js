import { Container } from "@material-ui/core";
import React from "react";

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container maxWidth="md" style={{ padding: 10 }}>
          {children === null ? null : children}
        </Container>
      )}
    </div>
  );
}
