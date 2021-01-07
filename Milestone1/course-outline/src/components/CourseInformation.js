import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import logo from "./schulich.png";
import { makeStyles } from "@material-ui/core";
import http from "../http-common";

export function Logo() {
  return (
    <Grid item xs={4}>
      <img src={logo} alt="Schulich" height="80" />
    </Grid>
  );
}

export default function CourseInformation({ appStatus, courseInformation }) {
  const {
    courseId,
    number,
    title,
    description,
    hours,
    credit,
    reference,
  } = courseInformation;

  const [courseInfo, setCourseInfo] = useState({
    number: number,
    title: title,
    description: description,
    hours: hours,
    credit: credit,
    reference: reference,
  });

  function handleOnChange(event) {
    const value = event.target.value;
    setCourseInfo({ ...courseInfo, [event.target.name]: value });
  }

  // useEffect(() => {
  //   if (appStatus) {
  //     axios({
  //       method: "post",
  //       url: "/restapi/courseoutline/",
  //       data: {
  //         courseId: courseId,
  //         courseNumber: courseInfo.number,
  //       },
  //       proxy: {
  //         protocol: "https",
  //         host: "127.0.0.1",
  //         port: 8000,
  //         auth: {
  //           username: "admin",
  //           password: "password",
  //         },
  //       },
  //     });
  //   }
  // }, [appStatus, courseId, courseInfo]);

  useEffect(() => {
    if (appStatus) {
      http.post("/admin/restapi/courseoutline", {
        courseId: courseId,
        courseNumber: courseInfo.number,
      });
    }
  }, [appStatus, courseId, courseInfo]);

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
      </Grid>
    </Container>
  );
}
