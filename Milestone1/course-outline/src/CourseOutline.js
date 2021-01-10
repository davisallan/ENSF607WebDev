import { React } from "react";
import axios from "axios";
import LearningOutcome from "./components/LearningOutcome";
import FinalGradeComponent from "./components/LetterGradeTable";
import CourseInformation from "./components/CourseInformation";
import Typography from "@material-ui/core/Typography";
import { Logo } from "./components/CourseInformation";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

export default function CourseOutline() {
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

  function learningOutcomeRetrieval(courseId) {
    var outcomeInfo;
    axios
      .get(`http://127.0.0.1:8000/learningOutcome/?courseId=${courseId}`)
      .then(function (response) {
        outcomeInfo = [];
        for (const outcome of response.data) {
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
    return outcomeInfo;
  }

  function gradeTableRetrieval(courseId) {
    var gradeTableInfo;
    axios
      .get(`http://127.0.0.1:8000/finalGradeTable/?courseId=${courseId}`)
      .then(function (response) {
        gradeTableInfo = [];
        for (const gradeRow of response.data) {
          gradeTableInfo.push({
            id: gradeRow.finalGradeId,
            gradeComponent: gradeRow.component,
            outcomes: gradeRow.outcomes,
            weight: gradeRow.weight,
            fgExisting: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return gradeTableInfo;
  }

  function gradeInfoRetrieval(courseId) {
    var letterInfo = {
      notes: "",
      infoId: "",
      letterAPlus: "",
      letterA: "",
      letterAMinus: "",
      letterBPlus: "",
      letterB: "",
      letterBMinus: "",
      letterCPlus: "",
      letterC: "",
      letterCMinus: "",
      letterDPlus: "",
      letterD: "",
      letterF: "",
      ltExisting: false,
    };
    axios
      .get(`http://127.0.0.1:8000/finalGradeInfo/?courseId=${courseId}`)
      .then(function (response) {
        letterInfo.notes = response.data.infoId;
        letterInfo.infoId = response.data.notes;
        letterInfo.letterAPlus = response.data.letterAPlus;
        letterInfo.letterA = response.data.letterA;
        letterInfo.letterAMinus = response.data.letterAMinus;
        letterInfo.letterBPlus = response.data.letterBPlus;
        letterInfo.letterB = response.data.letterB;
        letterInfo.letterBMinus = response.data.letterBMinus;
        letterInfo.letterCPlus = response.data.letterCPlus;
        letterInfo.letterC = response.data.letterC;
        letterInfo.letterCMinus = response.data.letterCMinus;
        letterInfo.letterDPlus = response.data.letterDPlus;
        letterInfo.letterD = response.data.letterD;
        letterInfo.letterF = response.data.letterF;
        letterInfo.ltExisting = true;
      })
      .catch(function (error) {
        console.log(error);
      });
    return letterInfo;
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
    if (newOutline) {
      return [
        {
          courseId: courseId,
          id: uuidv4(),
          gradeComponent: "",
          outcomes: "",
          weight: 0,
          fgExisting: false,
        },
      ];
    } else {
      return gradeTableRetrieval(courseId);
    }
  }

  function LetterGradeInfo(newOutline) {
    if (newOutline) {
      return {
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
      };
    } else {
      return gradeInfoRetrieval(courseId);
    }
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
          courseId={courseId}
          finalGradeInfo={FinalGradeInfo(newOutline)}
          letterGradeInfo={LetterGradeInfo(newOutline)}
        />
      </body>
    </div>
  );
}
