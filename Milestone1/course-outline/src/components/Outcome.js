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
    <Grid container spacing={1} direction="row" alignContent="flex-end">
      <Grid item xs={1}>
        <Typography variant="body1" align="right">
          {outcomeNumber}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <TextField
          id="standard-multiline-flexible"
          placeholder="Outcome Description"
          multiline
          fullWidth
          onChange={updateDescription}
        />
      </Grid>
      <Grid item xs={1} justify="flex-end">
        <Button
          onClick={handleDeleteOutcome}
          variant="contained"
          style={{ float: "right" }}
          color="primary">
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
