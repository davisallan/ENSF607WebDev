import { React, useEffect, useState } from "react";
import axios from "axios";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    width: "100%",
    justify: "center",
  },
}));

export default function Home() {
  useEffect(() => {
    courseOutlineRetrieval();
  }, []);

  // function NewCourseId() {
  //   courseId = uuidv4();
  //   return courseId;
  // }

  const [outlines, setOutlines] = useState([]);

  function courseOutlineRetrieval() {
    axios
      .get(`http://127.0.0.1:8000/calendarInfo/`)
      .then(function (response) {
        setOutlines(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const classes = useStyles();

  return (
    <div>
      <header>
        <Container>
          <Grid container direction="row">
            <Logo />
            <Grid item xs={5}>
              <Typography variant="h3" align="center">
                University of Calgary Course Outline Builder
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </header>
      <body>
        <Container>
          <Button color="secondary">New Course Outline</Button>
          <Typography variant="h5" className={classes.root}>
            Existing Course Outlines
          </Typography>
          {outlines.map((outline) => (
            <Typography variant="h6" key={outline.courseId}>
              <Link
                to={{
                  pathname: `/courseoutline/${outline.courseId}`,
                  state: {
                    newOutline: false,
                  },
                }}
              >
                {outline.courseNumber}: {outline.courseTitle}
              </Link>
            </Typography>
          ))}
        </Container>
      </body>
    </div>
  );
}
