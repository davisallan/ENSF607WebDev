import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function Outcome({ outcome, outcomeNumber, deleteOutcome }) {
  function handleDeleteOutcome() {
    deleteOutcome(outcome.id);
  }

  return (
    <Grid container spacing={4} direction="row" justify="center">
      <Grid item>
        <span>{outcomeNumber}</span>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          fullWidth
          rowsMax={4}
        />
      </Grid>

      <Grid item>
        <Button
          onClick={handleDeleteOutcome}
          variant="contained"
          color="primary">
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
