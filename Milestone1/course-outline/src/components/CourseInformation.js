import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import TextAreaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import logo from "./schulich.png";

export default function CourseInformation() {
  const [number, setNumber] = useState("");
  const numberChange = (e) => {
    setNumber(e.target.number);
  };

  function Logo() {
    return (
      <Grid item>
        <img src={logo} alt="Schulich" />
      </Grid>
    );
  }

  function CourseNumber() {
    return (
      <Grid item>
        <TextField
          variant="filled"
          label="Course Number"
          placeholder="E.g. ENSF 409"
          value={number}
          onChange={numberChange}
        />
      </Grid>
    );
  }

  function CourseTitle() {
    return (
      <Grid item>
        <TextField
          variant="filled"
          label="Course Title"
          placeholder="E.g. Principles of Software Development"
          style={{ width: 392 }}
        />
      </Grid>
    );
  }

  function CourseDescription() {
    return (
      <TextAreaAutosize
        style={{ width: 386 }}
        placeholder="Description of the course"
        rowsMin={3}
      />
    );
  }

  function CourseLabel(text) {
    return (
      <Grid item>
        <TextField disabled variant="filled" defaultValue={text} />
      </Grid>
    );
  }

  function CourseInput(text) {
    return (
      <Grid item>
        <TextField variant="filled" placeholder={text} />
      </Grid>
    );
  }

  return (
    <div>
      <Grid container justify="center">
        <Logo />
      </Grid>
      <Grid container>
        <h3>1. Calendar Information</h3>
      </Grid>
      <Grid container>
        <CourseNumber />
      </Grid>
      <Grid container>
        <CourseTitle />
      </Grid>
      <Grid container>
        <CourseDescription />
      </Grid>
      <Grid container>
        {CourseLabel("Course Hours:")}
        {CourseInput("E.g. 3 units; H (3-2)")}
      </Grid>
      <Grid container>
        {CourseLabel("Academic Credit:")}
        {CourseInput("E.g. 3")}
      </Grid>
      <Grid container>
        {CourseLabel("Calendar Reference:")}
        {CourseInput(
          "E.g. http://www.ucalgary.ca/pubs/calendar/current/software-engineering-for-engineers.html#38252"
        )}
      </Grid>
    </div>
  );
}
