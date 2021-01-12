import { React, useEffect, useState } from "react";
import axios from "axios";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7),
    width: "100%",
    justify: "center",
  },
}));

export default function Home() {
  useEffect(() => {
    courseOutlineRetrieval();
  }, []);

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

  const courseId = uuidv4();

  // function newCourseId() {
  //   courseId = uuidv4();
  // }

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
          <Grid container direction="row">
            <Grid item xs={5}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: 50 }}
                component={Link}
                to={{
                  pathname: `/courseoutline/${courseId}`,
                  state: {
                    newOutline: true,
                    courseId: courseId,
                  },
                }}
              >
                New Course Outline
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="h5" className={classes.root}>
                Existing Course Outlines
              </Typography>

              {outlines.map((outline) => (
                <Typography variant="subtitle1" key={outline.courseId}>
                  <Link
                    style={{ color: "black" }}
                    to={{
                      pathname: `/courseoutline/${outline.courseId}`,
                      state: {
                        newOutline: false,
                        courseId: outline.courseId,
                      },
                    }}
                  >
                    {outline.courseNumber}: {outline.courseTitle}
                  </Link>
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Container>
      </body>
    </div>
  );
}
