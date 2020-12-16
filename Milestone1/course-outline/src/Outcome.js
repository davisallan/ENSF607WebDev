import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function Outcome({ outcome, deleteOutcome }) {
  function handleDeleteOutcome() {
    deleteOutcome(outcome.id);
  }

  return (
    <div>
      <TextField
        id="standard-multiline-flexible"
        label="Description"
        multiline
        rowsMax={4}
      />
      <Button onClick={handleDeleteOutcome} variant="contained" color="primary">
        Delete
      </Button>
    </div>
  );
}
