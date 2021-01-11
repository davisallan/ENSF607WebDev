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
    ltExisting: false,
  };

  var outcomeInfo = [];
  var gradAttrInfo = [];
  var gradTableInfo = [];
  var letterTableInfo = [
    {
      id: 1,
      letter: "A+",
      leftRange: "95.0",
      comparison: "<= T <",
      rightRange: "100.0",
    },
    {
      id: 2,
      letter: "A",
      leftRange: "90.0",
      comparison: "<= T <",
      rightRange: "95.0",
    },
    {
      id: 3,
      letter: "A-",
      leftRange: "85.0",
      comparison: "<= T <",
      rightRange: "90.0",
    },
    {
      id: 4,
      letter: "B+",
      leftRange: "80.0",
      comparison: "<= T <",
      rightRange: "85.0",
    },
    {
      id: 5,
      letter: "B",
      leftRange: "75.0",
      comparison: "<= T <",
      rightRange: "80.0",
    },
    {
      id: 6,
      letter: "B-",
      leftRange: "70.0",
      comparison: "<= T <",
      rightRange: "75.0",
    },
    {
      id: 7,
      letter: "C+",
      leftRange: "65.0",
      comparison: "<= T <",
      rightRange: "70.0",
    },
    {
      id: 8,
      letter: "C",
      leftRange: "60.0",
      comparison: "<= T <",
      rightRange: "65.0",
    },
    {
      id: 9,
      letter: "C-",
      leftRange: "56.0",
      comparison: "<= T <",
      rightRange: "60.0",
    },
    {
      id: 10,
      letter: "D+",
      leftRange: "53.0",
      comparison: "<= T <",
      rightRange: "56.0",
    },
    {
      id: 11,
      letter: "D",
      leftRange: "50.0",
      comparison: "<= T <",
      rightRange: "53.0",
    },
    {
      id: 12,
      letter: "F",
      leftRange: "",
      comparison: "T <",
      rightRange: "50.0",
    },
  ];

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
        letterInfo.notes = response.data[0].notes;
        letterInfo.infoId = response.data[0].infoId;
        letterInfo.ltExisting = true;
        letterTableInfo[0].leftRange = response.data[0].letterAPlus;
        letterTableInfo[1].rightRange = response.data[0].letterAPlus;
        letterTableInfo[1].leftRange = response.data[0].letterA;
        letterTableInfo[2].rightRange = response.data[0].letterA;
        letterTableInfo[2].leftRange = response.data[0].letterAMinus;
        letterTableInfo[3].rightRange = response.data[0].letterAMinus;
        letterTableInfo[3].leftRange = response.data[0].letterBPlus;
        letterTableInfo[4].rightRange = response.data[0].letterBPlus;
        letterTableInfo[4].leftRange = response.data[0].letterB;
        letterTableInfo[5].rightRange = response.data[0].letterB;
        letterTableInfo[5].leftRange = response.data[0].letterBMinus;
        letterTableInfo[6].rightRange = response.data[0].letterBMinus;
        letterTableInfo[6].leftRange = response.data[0].letterCPlus;
        letterTableInfo[7].rightRange = response.data[0].letterCPlus;
        letterTableInfo[7].leftRange = response.data[0].letterC;
        letterTableInfo[8].rightRange = response.data[0].letterC;
        letterTableInfo[8].leftRange = response.data[0].letterCMinus;
        letterTableInfo[9].rightRange = response.data[0].letterCMinus;
        letterTableInfo[9].leftRange = response.data[0].letterDPlus;
        letterTableInfo[10].rightRange = response.data[0].letterDPlus;
        letterTableInfo[10].leftRange = response.data[0].letterD;
        letterTableInfo[11].rightRange = response.data[0].letterD;
        letterTableInfo[11].leftRange = response.data[0].letterF;
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
          letterTableInfo={letterTableInfo}
        />
      </body>
    </div>
  );
}
