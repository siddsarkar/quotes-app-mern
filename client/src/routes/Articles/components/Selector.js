import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: "center",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Selector({ handleSort }) {
  const classes = useStyles();
  const [sort, setSort] = React.useState("none");

  const handleChange = (event) => {
    setSort(event.target.value);
    handleSort(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          aria-label="none"
          id="demo-simple-select"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="none">
            <Typography>Default</Typography>
          </MenuItem>
          <MenuItem value="addedOn">
            <Typography>Latest</Typography>
          </MenuItem>
          <MenuItem value="likesCount">
            <Typography>Popular</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
