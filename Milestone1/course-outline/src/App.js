import { React } from "react";
import axios from "axios";
import LearningOutcome from "./components/LearningOutcome";
import FinalGradeComponent from "./components/LetterGradeTable";
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

  var newOutline = false;

  var newCourseId;

  function NewCourseId() {
    newCourseId = uuidv4();
    return newCourseId;
  }

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

  function InformationRetrieval(courseId) {
    axios
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
      });
    return information;
  }

  function CourseInfo(newOutline) {
    if (newOutline) {
      return {
        courseId: NewCourseId(),
        number: "",
        title: "Test success",
        description: "",
        hours: "",
        credit: "",
        reference: "",
        existingOutline: false,
      };
    } else {
      return InformationRetrieval("b58fe20d-b492-4c53-8873-04f6f4499a2d");
    }
  }

  function FinalGradeInfo(newOutline) {
    return newOutline
      ? {
          CourseId: newCourseId,
          id: uuidv4(),
          gradeComponent: "",
          outcomes: "",
          weight: 0,
          fgExisting: false,
        }
      : {
          CourseId: "",
          id: "",
          gradeComponent: "",
          outcomes: "",
          weight: 0,
          fgExisting: true,
        };
  }

  function LetterGradeInfo(newOutline) {
    return newOutline
      ? {
          notes: "",
          letterAPlus: "95.0",
          letterA: "90.0",
          letterAMinus: "85.0",
          letterBPlus: "80.0",
          letterB: "75.0",
          letterBMinus: "70.0",
          letterCPlus: "65.0",
          letterC: "60.0",
          letterCMinus: "56.0",
          letterDPlus: "53.0",
          letterD: "50.0",
          letterF: "",
          ltExisting: false,
        }
      : {
          notes: "",
          letterAPlus: "95.0",
          letterA: "90.0",
          letterAMinus: "85.0",
          letterBPlus: "80.0",
          letterB: "75.0",
          letterBMinus: "70.0",
          letterCPlus: "65.0",
          letterC: "60.0",
          letterCMinus: "56.0",
          letterDPlus: "53.0",
          letterD: "50.0",
          letterF: "",
          ltExisting: false,
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
          <FinalGradeComponent
            finalGradeInfo={FinalGradeInfo(newOutline)}
            letterGradeInfo={LetterGradeInfo(newOutline)}
          />
        </body>
      </div>
    </ThemeProvider>
  );
}

export default App;
