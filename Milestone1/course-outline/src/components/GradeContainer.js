import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import GradeTable from "./FinalGradeTable";
import { TextField } from "@material-ui/core";

function GradeTitle() {
  return <Typography variant="h5">3. Final Grade Determination</Typography>;
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
      placeholder="Enter Notes About Grade Breakdown"
      multiline
      fullWidth={true}
    />
  );
}

export default function CombinedGrades() {
  return (
    <Container fixed>
      <GradeTitle />
      <TitleText />
      <GradeTable />
      <NotesTitle />
      <NotesArea />
    </Container>
  );
}
