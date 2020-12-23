import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GradeTable from "./FinalGradeTable";
import LetterTable from "./LetterGradeTable";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    width: "100%",
    justify: "center",
  },
}));

function GradeTitle() {
  const classes = useStyles();
  return (
    <Typography variant="h5" className={classes.root}>
      3. Final Grade Determination
    </Typography>
  );
}

function TitleText() {
  return (
    <Typography variant="subtitle1" align="left">
      The final grade in this course will be based on the following components:
    </Typography>
  );
}

function NotesTitle() {
  return <Typography variant="h6">Notes:</Typography>;
}

function NotesArea() {
  return (
    <TextField
      id="grade-notes"
      placeholder="Enter notes about grade breakdown"
      multiline
      fullWidth={true}
    />
  );
}

export default function CombinedGrades() {
  return (
    <Container>
      <GradeTitle />
      <TitleText />
      <GradeTable />
      <NotesTitle />
      <NotesArea />
      <LetterTable />
    </Container>
  );
}
