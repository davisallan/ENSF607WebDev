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

  var courseId = "379aab3c-031c-4ad4-b319-3cfb0a1beea2";

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

  var outcomeInfo = [];
  var gradAttrInfo = [];
  var gradTableInfo = [];

  function InformationRetrieval() {
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

  function learningOutcomeRetrieval() {
    axios
      .get(`http://127.0.0.1:8000/learningOutcome/?courseId=${courseId}`)
      .then(function (response) {
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

  function graduateAttrRetrieval() {
    axios
      .get(`http://127.0.0.1:8000/graduateAttribute/?courseId=${courseId}`)
      .then(function (response) {
        for (const gradAttr of response.data) {
          gradAttrInfo.push({
            gradId: gradAttr.gradId,
            outcomeNumber: gradAttr.outcomeNumber,
            graduateAttribute: gradAttr.graduateAttribute,
            instructionLevel: gradAttr.instructionLevel,
            attributeExisting: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return gradAttrInfo;
  }

  function gradeTableRetrieval() {
    axios
      .get(`http://127.0.0.1:8000/finalGradeTable/?courseId=${courseId}`)
      .then(function (response) {
        for (const component of response.data) {
          gradTableInfo.push({
            id: component.finalGradeId,
            gradeComponent: component.component,
            outcomes: component.outcomes,
            weight: component.weight,
            fgExisting: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return gradTableInfo;
  }

  function gradeInfoRetrieval() {
    axios
      .get(`http://127.0.0.1:8000/finalGradeInfo/?courseId=${courseId}`)
      .then(function (response) {
        console.log(response);
        letterInfo.notes = response.data[0].notes;
        letterInfo.infoId = response.data[0].infoId;
        letterInfo.letterAPlus = response.data[0].letterAPlus;
        letterInfo.letterA = response.data[0].letterA;
        letterInfo.letterAMinus = response.data[0].letterAMinus;
        letterInfo.letterBPlus = response.data[0].letterBPlus;
        letterInfo.letterB = response.data[0].letterB;
        letterInfo.letterBMinus = response.data[0].letterBMinus;
        letterInfo.letterCPlus = response.data[0].letterCPlus;
        letterInfo.letterC = response.data[0].letterC;
        letterInfo.letterCMinus = response.data[0].letterCMinus;
        letterInfo.letterDPlus = response.data[0].letterDPlus;
        letterInfo.letterD = response.data[0].letterD;
        letterInfo.letterF = response.data[0].letterF;
        letterInfo.ltExisting = true;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(letterInfo);
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
      return InformationRetrieval();
    }
  }

  function FinalGradeInfo(newOutline) {
    if (newOutline) {
      return [
        {
          id: uuidv4(),
          gradeComponent: "",
          outcomes: "",
          weight: 0,
          fgExisting: false,
        },
      ];
    } else {
      return gradeTableRetrieval();
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
      return gradeInfoRetrieval();
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
      return learningOutcomeRetrieval();
    }
  }

  function GradAttributeInfo(newOutline) {
    if (newOutline) {
      return [
        {
          gradId: uuidv4(),
          outcomeNumber: "",
          graduateAttribute: "",
          instructionLevel: "",
          attributeExisting: false,
        },
      ];
    } else {
      return graduateAttrRetrieval();
    }
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
        <CourseInformation
          courseId={courseId}
          courseInformation={CourseInfo(newOutline)}
        />
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
