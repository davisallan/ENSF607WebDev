import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function Outcome({
  outcome,
  outcomeNumber,
  deleteOutcome,
  description,
}) {
  function handleDeleteOutcome() {
    deleteOutcome(outcome.id);
  }

  function updateDescription(e) {
    description(e, outcome.id);
  }

  return (
    <Grid container spacing={4} direction="row">
      <Grid item>
        <Typography variant="body1">{outcomeNumber}</Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="standard-multiline-flexible"
          placeholder="Description"
          multiline
          fullWidth
          onChange={updateDescription}
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
