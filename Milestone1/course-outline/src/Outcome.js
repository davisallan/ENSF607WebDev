import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Outcome({ outcome }) {
  return (
    <div>
      <TextField
        id="standard-multiline-flexible"
        label="Description"
        multiline
        rowsMax={4}
      />
      <Button variant="contained" color="primary">
        Delete
      </Button>
    </div>
  );
}
