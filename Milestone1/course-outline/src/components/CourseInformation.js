import React from "react";
import TextField from "@material-ui/core/TextField";
import TextAreaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "./schulich.png";
import { makeStyles } from "@material-ui/core";

function Logo() {
  return (
    <Grid item xs={12}>
      <img src={logo} alt="Schulich" />
    </Grid>
  );
}

function CourseNumber() {
  return (
    <Grid item xs={12}>
      <TextField label="Course Number" placeholder="E.g. ENSF 409" />
    </Grid>
  );
}

function CourseTitle() {
  return (
    <Grid item xs={12}>
      <TextField
        label="Course Title"
        placeholder="E.g. Principles of Software Development"
        style={{ width: 392 }}
      />
    </Grid>
  );
}

function CourseDescription() {
  return (
    <Grid item xs={12}>
      <TextAreaAutosize
        style={{ width: 600 }}
        placeholder="Description of the course"
        rowsMin={3}
      />
    </Grid>
  );
}

function CourseHours() {
  return (
    <Grid item xs={12}>
      <TextField label="Course Hours" placeholder="E.g. 3 units; H (3-2)" />
    </Grid>
  );
}

function AcademicCredit() {
  return (
    <Grid item xs={12}>
      <TextField label="Academic Credit" placeholder="E.g. 3" />
    </Grid>
  );
}

function CalendarReference() {
  return (
    <Grid item xs={12}>
      <TextField
        style={{ width: 750 }}
        label="Calendar Reference"
        placeholder="E.g.
        http://www.ucalgary.ca/pubs/calendar/current/software-engineering-for-engineers.html#38252"
      />
    </Grid>
  );
}

export default function CourseInformation() {
  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(4),
      width: "100%",
      marginBottom: theme.spacing(4),
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container spacing={1} justify="flex">
        <Logo />
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h5">
            1. Calendar Information
          </Typography>
        </Grid>
        <CourseNumber />
        <CourseTitle />
        <CourseDescription />
        <CourseHours />
        <AcademicCredit />
        <CalendarReference />
      </Grid>
    </Container>
  );
}
