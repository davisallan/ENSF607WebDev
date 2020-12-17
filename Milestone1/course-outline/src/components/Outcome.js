import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
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
      <Grid item xs={"auto"}>
        <Typography variant="body1" align="right">
          {outcomeNumber}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <TextField
          id="standard-multiline-flexible"
          placeholder="Outcome Description"
          multiline
          fullWidth
          onChange={updateDescription}
        />
      </Grid>
      <Grid item xs={"auto"}>
        {/* <Button
          onClick={handleDeleteOutcome}
          variant="contained"
          style={{ float: "right" }}
          color="primary">
          Delete
        </Button> */}
        <DeleteIcon
          style={{
            cursor: "pointer",
          }}
          onClick={handleDeleteOutcome}></DeleteIcon>
      </Grid>
    </Grid>
  );
}
