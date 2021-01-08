import { React } from "react";
import LearningOutcome from "./components/LearningOutcome";
import GradeContainer from "./components/GradeContainer";
import CourseInformation from "./components/CourseInformation";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { red, orange } from "@material-ui/core/colors";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { Container } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

function App() {
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

  var newOutline = true;

  var newCourseId;

  function NewCourseId() {
    newCourseId = uuidv4();
    return newCourseId;
  }

  function CourseInfo(newOutline) {
    return newOutline
      ? {
          courseId: NewCourseId(),
          number: "",
          title: "Test success",
          description: "",
          hours: "",
          credit: "",
          reference: "",
          existingOutline: false,
        }
      : {
          courseId: "",
          number: "",
          title: "Test failed",
          description: "",
          hours: "",
          credit: "",
          reference: "",
          existingOutline: true,
        };
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
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
        <body className="App-body">
          <CourseInformation courseInformation={CourseInfo(newOutline)} />
          <LearningOutcome />
          <GradeContainer />
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
