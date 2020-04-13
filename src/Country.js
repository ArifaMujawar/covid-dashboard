import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: 20,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Country(props) {
  const classes = useStyles();
  const [country, setCountry] = useState("India");
  const handleChange = (event) => {
    props.handler(event.target.value);
    setCountry(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={country}
          onChange={handleChange}
          label="Country"
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="Finland">Finland </MenuItem>
          <MenuItem value="Italy">Italy</MenuItem>
          <MenuItem value="Sweden">Sweden</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
