import React, { useState } from "react";
import {
  Button,
  Table,
  Paper,
  Container,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import GradeTable from "./FinalGradeTable";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    width: "100%",
    justify: "center",
  },
  paper: {
    marginTop: theme.spacing(1),
    width: "43%",
    marginBottom: theme.spacing(1),
  },
  table: {
    width: 300,
  },
}));

export default function FinalGradeComponent({
  finalGradeInfo,
  letterGradeInfo,
}) {
  const {
    notes,
    letterAPlus,
    letterA,
    letterAMinus,
    letterBPlus,
    letterB,
    letterBMinus,
    letterCPlus,
    letterC,
    letterCMinus,
    letterDPlus,
    letterD,
    letterF,
    ltExisting,
  } = letterGradeInfo;

  const {
    courseId,
    id,
    gradeComponent,
    outcomes,
    weight,
    fgExisting,
  } = finalGradeInfo;

  const [gtbreakdown, setGTBreakdown] = useState([
    {
      id: id,
      gradeComponent: gradeComponent,
      outcomes: outcomes,
      weight: weight,
      existing: fgExisting,
    },
  ]);

  const [noteArea, setNoteArea] = useState([
    {
      notes: notes,
      ltExisting: ltExisting,
    },
  ]);

  const [ltbreakdown, setLTBreakdown] = useState([
    {
      id: 1,
      letter: "A+",
      leftRange: letterAPlus,
      comparison: "<= T <",
      rightRange: "100.0",
    },
    {
      id: 2,
      letter: "A",
      leftRange: letterA,
      comparison: "<= T <",
      rightRange: letterAPlus,
    },
    {
      id: 3,
      letter: "A-",
      leftRange: letterAMinus,
      comparison: "<= T <",
      rightRange: letterA,
    },
    {
      id: 4,
      letter: "B+",
      leftRange: letterBPlus,
      comparison: "<= T <",
      rightRange: letterAMinus,
    },
    {
      id: 5,
      letter: "B",
      leftRange: letterB,
      comparison: "<= T <",
      rightRange: letterBPlus,
    },
    {
      id: 6,
      letter: "B-",
      leftRange: letterBMinus,
      comparison: "<= T <",
      rightRange: letterB,
    },
    {
      id: 7,
      letter: "C+",
      leftRange: letterCPlus,
      comparison: "<= T <",
      rightRange: letterBMinus,
    },
    {
      id: 8,
      letter: "C",
      leftRange: letterC,
      comparison: "<= T <",
      rightRange: letterCPlus,
    },
    {
      id: 9,
      letter: "C-",
      leftRange: letterCMinus,
      comparison: "<= T <",
      rightRange: letterC,
    },
    {
      id: 10,
      letter: "D+",
      leftRange: letterDPlus,
      comparison: "<= T <",
      rightRange: letterCMinus,
    },
    {
      id: 11,
      letter: "D",
      leftRange: letterD,
      comparison: "<= T <",
      rightRange: letterDPlus,
    },
    {
      id: 12,
      letter: "F",
      leftRange: letterF,
      comparison: "T <",
      rightRange: letterD,
    },
  ]);

  function updateRightCol(e, i) {
    const onlyNums = e.target.value.replace(/[^0-9]\./g, "");
    if (onlyNums.length >= 0 && onlyNums <= 100) {
      let result = ltbreakdown.map((ltbreakdown) => {
        return ltbreakdown.id === i + 1
          ? {
              ...ltbreakdown,
              rightRange: onlyNums,
            }
          : {
              ...ltbreakdown,
            };
      });
      setLTBreakdown(result);
    }
  }

  function handlePercentChange(e, i) {
    const onlyNums = e.target.value.replace(/[^0-9]\./g, "");
    if (onlyNums.length >= 0 && onlyNums <= 100) {
      let result = ltbreakdown.map((ltbreakdown) => {
        return ltbreakdown.id === i
          ? {
              ...ltbreakdown,
              [e.target.name]: onlyNums,
            }
          : {
              ...ltbreakdown,
            };
      });
      setLTBreakdown(result);
      //updateRightCol(onlyNums, i + 1);
    }
  }

  function handleNoteChange(event) {
    const value = event.target.value;
    setNoteArea({ ...noteArea, [event.target.name]: value });
  }

  function editFinalGrade() {
    axios
      .put(`http://127.0.0.1:8000/finalGradeTable/${courseId}/`, {
        courseId: courseId,
        id: gtbreakdown.id,
        gradeComponent: gtbreakdown.gradeComponent,
        outcomes: gtbreakdown.outcomes,
        weight: gtbreakdown.weight,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function newFinalGrade() {
    axios
      .post("http://127.0.0.1:8000/finalGradeTable/", {
        courseId: courseId,
        id: gtbreakdown.id,
        gradeComponent: gtbreakdown.gradeComponent,
        outcomes: gtbreakdown.outcomes,
        weight: gtbreakdown.weight,
      })
      .then(function (response) {
        setGTBreakdown({ ...gtbreakdown, fgExisting: true });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editLetterGrade() {
    axios
      .put(`http://127.0.0.1:8000/finalGradeInfo/${courseId}/`, {
        courseId: courseId,
        notes: noteArea.notes,
        letterAPlus: ltbreakdown.leftRange,
        letterA: ltbreakdown.leftRange,
        letterAMinus: ltbreakdown.leftRange,
        letterBPlus: ltbreakdown.leftRange,
        letterB: ltbreakdown.leftRange,
        letterBMinus: ltbreakdown.leftRange,
        letterCPlus: ltbreakdown.leftRange,
        letterC: ltbreakdown.leftRange,
        letterCMinus: ltbreakdown.leftRange,
        letterDPlus: ltbreakdown.leftRange,
        letterD: ltbreakdown.leftRange,
        letterF: ltbreakdown.leftRange,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function newLetterGrade() {
    axios
      .post("http://127.0.0.1:8000/finalGradeInfo/", {
        courseId: courseId,
        notes: noteArea.notes,
        letterAPlus: ltbreakdown.leftRange,
        letterA: ltbreakdown.leftRange,
        letterAMinus: ltbreakdown.leftRange,
        letterBPlus: ltbreakdown.leftRange,
        letterB: ltbreakdown.leftRange,
        letterBMinus: ltbreakdown.leftRange,
        letterCPlus: ltbreakdown.leftRange,
        letterC: ltbreakdown.leftRange,
        letterCMinus: ltbreakdown.leftRange,
        letterDPlus: ltbreakdown.leftRange,
        letterD: ltbreakdown.leftRange,
        letterF: ltbreakdown.leftRange,
      })
      .then(function (response) {
        setNoteArea({ ...noteArea, ltExisting: true });
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function saveInfo() {
    gtbreakdown.existing ? editFinalGrade() : newFinalGrade();
    noteArea.existing ? editLetterGrade() : newLetterGrade();
  }

  function GradeTitle() {
    const classes = useStyles();
    return (
      <Typography variant="h5" className={classes.root}>
        3. Final Grade Determination
      </Typography>
    );
  }

  function TitleText() {
    return (
      <Typography variant="subtitle1" align="left">
        The final grade in this course will be based on the following
        components:
      </Typography>
    );
  }

  function NotesTitle() {
    return <Typography variant="h6">Notes:</Typography>;
  }

  function NotesArea() {
    return (
      <TextField
        id="grade-notes"
        placeholder="Enter notes about grade breakdown"
        multiline
        fullWidth={true}
        onChange={(e) => handleNoteChange(e)}
      />
    );
  }

  const classes = useStyles();

  return (
    <Container>
      <GradeTitle />
      <TitleText />
      <GradeTable />
      <NotesTitle />
      <NotesArea />
      <div className={classes.root}>
        <Container align="center">
          <Paper className={classes.paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    key="letterGrade"
                    align="center"
                    style={{
                      minWidth: 125,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: "white",
                    }}
                  >
                    Letter Grade
                  </TableCell>
                  <TableCell
                    key="totalMark"
                    align="center"
                    colSpan={3}
                    style={{
                      minWidth: 300,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: "white",
                    }}
                  >
                    Total Mark (T)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ltbreakdown.map((ltbreakdown, id) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row" align="center">
                      {ltbreakdown.letter}
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="leftRange"
                        value={ltbreakdown.leftRange}
                        inputProps={{ style: { textAlign: "center" } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                        }}
                        style={{ width: "5rem" }}
                        onChange={(e) => handlePercentChange(e, ltbreakdown.id)}
                        onBlur={(e) => updateRightCol(e, ltbreakdown.id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {ltbreakdown.comparison}
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="rightRange"
                        value={ltbreakdown.rightRange}
                        inputProps={{ style: { textAlign: "center" } }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          readOnly: true,
                        }}
                        style={{ width: "5rem" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </div>
      <Container align="right">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={saveInfo}
        >
          Save
        </Button>
      </Container>
    </Container>
  );
}
