import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "./schulich.png";
import { makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

export function Logo() {
  return (
    <Grid item xs={4}>
      <img src={logo} alt="Schulich" height="80" />
    </Grid>
  );
}

export default function CourseInformation({ courseId, newOutline }) {
  const [courseInfo, setCourseInfo] = useState({
    courseId: courseId,
    number: "",
    title: "",
    description: "",
    hours: "",
    credit: "",
    reference: "",
    existingOutline: false,
  });

  const informationRetrieval = useCallback(async () => {
    var information = {
      courseId: "",
      number: "",
      title: "",
      description: "",
      hours: "",
      credit: "",
      reference: "",
      existingOutline: false,
    };
    await axios
      .get(`http://127.0.0.1:8000/calendarInfo/${courseId}/`)
      .then(function (response) {
        information.courseId = response.data.courseId;
        information.number = response.data.courseNumber;
        information.title = response.data.courseTitle;
        information.description = response.data.courseDescription;
        information.hours = response.data.courseHours;
        information.credit = response.data.academicCredit;
        information.reference = response.data.calendarReference;
        information.existingOutline = true;
        setCourseInfo(information);
      });
  }, [courseId]);

  useEffect(() => {
    if (!newOutline) {
      informationRetrieval();
    }
  }, [newOutline, informationRetrieval]);

  function handleOnChange(event) {
    const value = event.target.value;
    setCourseInfo({ ...courseInfo, [event.target.name]: value });
  }

  function editCourseInfo() {
    axios
      .put(`http://127.0.0.1:8000/calendarInfo/${courseId}/`, {
        courseId: courseId,
        courseNumber: courseInfo.number,
        courseTitle: courseInfo.title,
        courseDescription: courseInfo.description,
        courseHours: courseInfo.hours,
        academicCredit: courseInfo.credit,
        calendarReference: courseInfo.reference,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function newCourseInfo() {
    axios
      .post("http://127.0.0.1:8000/calendarInfo/", {
        courseId: courseId,
        courseNumber: courseInfo.number,
        courseTitle: courseInfo.title,
        courseDescription: courseInfo.description,
        courseHours: courseInfo.hours,
        academicCredit: courseInfo.credit,
        calendarReference: courseInfo.reference,
      })
      .then(function (response) {
        setCourseInfo({ ...courseInfo, existingOutline: true });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function saveInfo() {
    courseInfo.existingOutline ? editCourseInfo() : newCourseInfo();
  }

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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h5">
            1. Calendar Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Course Number"
            placeholder="E.g. ENSF 409"
            style={{ width: 750 }}
            name="number"
            onChange={handleOnChange}
            value={courseInfo.number}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Course Title"
            placeholder="E.g. Principles of Software Development"
            style={{ width: 750 }}
            name="title"
            onChange={handleOnChange}
            value={courseInfo.title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Course Description"
            placeholder="Description of course"
            multiline
            style={{ width: 750 }}
            name="description"
            onChange={handleOnChange}
            value={courseInfo.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Course Hours"
            placeholder="E.g. 3 units; H (3-2)"
            style={{ width: 750 }}
            name="hours"
            onChange={handleOnChange}
            value={courseInfo.hours}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Academic Credit"
            placeholder="E.g. 3"
            style={{ width: 750 }}
            name="credit"
            onChange={handleOnChange}
            value={courseInfo.credit}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            style={{ width: 750 }}
            label="Calendar Reference"
            multiline
            placeholder="E.g. http://www.ucalgary.ca/pubs/calendar/current/software-engineering-for-engineers.html#38252"
            name="reference"
            onChange={handleOnChange}
            value={courseInfo.reference}
          />
        </Grid>
        <Grid item xs={12}>
          <Container align="right">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={saveInfo}
            >
              Save
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
