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

  var courseId;

  function NewCourseId() {
    courseId = uuidv4();
    return courseId;
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

  var outcomeInfo = [];

  function InformationRetrieval(courseId) {
    axios
      .get(`http://127.0.0.1:8000/calendarInfo/${courseId}/`)
      .then(function (response) {
        console.log("inside Info retrieval then");
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

  function learningOutcomeRetrieval(courseId) {
    axios
      .get(`http://127.0.0.1:8000/learningOutcome/?courseId=${courseId}`)
      .then(function (response) {
        for (const outcome of response.data) {
          console.log(response.data);
          outcomeInfo.push({
            id: outcome.outcomeId,
            description: outcome.outcomeDescription,
            outcomeExisting: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(outcomeInfo);
    return outcomeInfo;
  }

  function CourseInfo(newOutline) {
    if (newOutline) {
      return {
        courseId: NewCourseId(),
        number: "",
        title: "",
        description: "",
        hours: "",
        credit: "",
        reference: "",
        existingOutline: false,
      };
    } else {
      return InformationRetrieval("379aab3c-031c-4ad4-b319-3cfb0a1beea2");
    }
  }

  function FinalGradeInfo(newOutline) {
    return newOutline
      ? {
          courseId: courseId,
          id: uuidv4(),
          gradeComponent: "",
          outcomes: "",
          weight: 0,
          fgExisting: false,
        }
      : {
          courseId: "",
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
          courseId: courseId,
          notes: "",
          infoId: uuidv4(),
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
          courseId: "",
          notes: "",
          infoId: "",
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
          ltExisting: true,
        };
  }

  function LearningOutcomeInfo(newOutline) {
    if (newOutline) {
      return [
        {
          id: uuidv4(),
          description: "",
          outcomeExisting: false,
        },
      ];
    } else {
      return learningOutcomeRetrieval("02b715dd-c7de-437c-863e-9d873a964484");
    }
  }

  function GradAttributeInfo(newOutline) {
    return newOutline
      ? {
          gradId: uuidv4(),
          outcomeNumber: "",
          graduateAttribute: "",
          instructionLevel: "",
          attributeExisting: false,
        }
      : {
          gradId: "",
          outcomeNumber: "",
          graduateAttribute: "",
          instructionLevel: "",
          attributeExisting: true,
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
          <LearningOutcome
            courseId={courseId}
            learningOutcomeInfo={LearningOutcomeInfo(newOutline)}
            gradAttributeInfo={GradAttributeInfo(newOutline)}
          />
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
