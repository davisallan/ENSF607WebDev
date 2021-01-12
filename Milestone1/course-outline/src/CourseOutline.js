import { React, useState } from "react";
import LearningOutcome from "./components/LearningOutcome";
import FinalGradeComponent from "./components/LetterGradeTable";
import CourseInformation from "./components/CourseInformation";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { red, orange } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export default function CourseOutline({ location }) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: orange[400],
      },
      secondary: {
        main: red[600],
      },
    },
  });

  var newOutline = location.state.newOutline;
  var courseId = location.state.courseId;

  const [alertOpen, setAlertOpen] = useState(false);
  const [messageAlert, setMessageAlert] = useState({
    severity: "",
    message: "",
  });

  const handleClose = () => {
    setAlertOpen(false);
    setMessageAlert({ severity: "", message: "" });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <header>
          <Container>
            <Grid container direction="row">
              <Logo />
              <Grid item xs={5}>
                <Typography variant="h3" align="center">
                  University of Calgary Course Outline
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </header>
        <body>
          <Container>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to={{
                pathname: `/`,
              }}>
              BACK
            </Button>
          </Container>
          <CourseInformation
            courseId={courseId}
            newOutline={newOutline}
            setMessageAlert={setMessageAlert}
            setAlertOpen={setAlertOpen}
          />
          <LearningOutcome
            courseId={courseId}
            newOutline={newOutline}
            setMessageAlert={setMessageAlert}
            setAlertOpen={setAlertOpen}
          />
          <FinalGradeComponent
            courseId={courseId}
            newOutline={newOutline}
            setMessageAlert={setMessageAlert}
            setAlertOpen={setAlertOpen}
          />
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageAlert.severity}>
              {messageAlert.message}
            </Alert>
          </Snackbar>
        </body>
      </div>
    </ThemeProvider>
  );
}
