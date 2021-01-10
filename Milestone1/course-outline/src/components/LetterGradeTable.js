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
import { v4 as uuidv4 } from "uuid";

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
    courseId,
    notes,
    infoId,
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

  const { id, gradeComponent, outcomes, weight, fgExisting } = finalGradeInfo;

  const [gtbreakdown, setGTBreakdown] = useState([
    {
      gtid: id,
      gradeComponent: gradeComponent,
      outcomes: outcomes,
      weight: weight,
      fgExisting: fgExisting,
    },
  ]);

  const [noteArea, setNoteArea] = useState({
    notes: notes,
    infoId: infoId,
    ltExisting: ltExisting,
  });

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
    }
  }

  function handleNoteChange(event) {
    const value = event.target.value;
    setNoteArea({ ...noteArea, [event.target.name]: value });
  }

  function addNewRow() {
    setGTBreakdown([
      ...gtbreakdown,
      {
        gtid: uuidv4(),
        gradeComponent: "",
        outcomes: "",
        weight: 0,
        fgExisting: false,
      },
    ]);
  }

  function inputChangeHandler(e, i) {
    let result = gtbreakdown.map((gtbreakdown) => {
      return gtbreakdown.gtid === i
        ? {
            ...gtbreakdown,
            [e.target.name]: e.target.value,
          }
        : {
            ...gtbreakdown,
          };
    });
    setGTBreakdown(result);
  }

  function handleWeightChange(e, i) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length >= 0 && onlyNums <= 100) {
      let result = gtbreakdown.map((gtbreakdown) => {
        return gtbreakdown.gtid === i
          ? {
              ...gtbreakdown,
              [e.target.name]: onlyNums,
            }
          : {
              ...gtbreakdown,
            };
      });
      setGTBreakdown(result);
    }
  }

  function deleteRowHandler(id) {
    const temp = [...gtbreakdown];
    const filteredRow = temp.filter((gtbreakdown) => gtbreakdown.gtid !== id);
    setGTBreakdown([...filteredRow]);
  }

  function subtotal(items) {
    let total = items
      .map(({ weight }) => Number.parseFloat(weight))
      .reduce((sum, i) => sum + i, 0);

    return total > 100 ? "Error" : total;
  }

  const gradeSubtotal = subtotal(gtbreakdown);

  function editFinalGrade(id) {
    for (const grade of gtbreakdown) {
      if (grade.gtid === id) {
        axios
          .put(`http://127.0.0.1:8000/finalGradeTable/${grade.gtid}/`, {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            finalGradeId: grade.gtid,
            component: grade.gradeComponent,
            outcomes: grade.outcomes,
            weight: grade.weight,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  function newFinalGrade(id, state) {
    let result = state.map((gtbreakdown) => {
      if (gtbreakdown.gtid === id) {
        axios
          .post("http://127.0.0.1:8000/finalGradeTable/", {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            finalGradeId: gtbreakdown.gtid,
            component: gtbreakdown.gradeComponent,
            outcomes: gtbreakdown.outcomes,
            weight: gtbreakdown.weight,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        return { ...gtbreakdown, fgExisting: true };
      } else {
        return { ...gtbreakdown };
      }
    });
    return result;
  }

  function storeLetterGrade() {
    let letters = {
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
    };
    for (const letterGrade of ltbreakdown) {
      switch (letterGrade.id) {
        case 1:
          letters.letterAPlus = letterGrade.leftRange;
          break;
        case 2:
          letters.letterA = letterGrade.leftRange;
          break;
        case 3:
          letters.letterAMinus = letterGrade.leftRange;
          break;
        case 4:
          letters.letterBPlus = letterGrade.leftRange;
          break;
        case 5:
          letters.letterB = letterGrade.leftRange;
          break;
        case 6:
          letters.letterBMinus = letterGrade.leftRange;
          break;
        case 7:
          letters.letterCPlus = letterGrade.leftRange;
          break;
        case 8:
          letters.letterC = letterGrade.leftRange;
          break;
        case 9:
          letters.letterCMinus = letterGrade.leftRange;
          break;
        case 10:
          letters.letterDPlus = letterGrade.leftRange;
          break;
        case 11:
          letters.letterD = letterGrade.leftRange;
          break;
        case 12:
          letters.letterF = letterGrade.leftRange;
          break;
        default:
          break;
      }
    }
    return letters;
  }

  function editLetterGrade() {
    const letters = storeLetterGrade();
    axios
      .put(`http://127.0.0.1:8000/finalGradeInfo/${noteArea.infoId}/`, {
        courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
        infoId: noteArea.infoId,
        notes: noteArea.notes,
        letterAPlus: letters.letterAPlus,
        letterA: letters.letterA,
        letterAMinus: letters.letterAMinus,
        letterBPlus: letters.letterBPlus,
        letterB: letters.letterB,
        letterBMinus: letters.letterBMinus,
        letterCPlus: letters.letterCPlus,
        letterC: letters.letterC,
        letterCMinus: letters.letterCMinus,
        letterDPlus: letters.letterDPlus,
        letterD: letters.letterD,
        letterF: letters.letterF,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function newLetterGrade() {
    const letters = storeLetterGrade();
    axios
      .post("http://127.0.0.1:8000/finalGradeInfo/", {
        courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
        infoId: noteArea.infoId,
        notes: noteArea.notes,
        letterAPlus: letters.letterAPlus,
        letterA: letters.letterA,
        letterAMinus: letters.letterAMinus,
        letterBPlus: letters.letterBPlus,
        letterB: letters.letterB,
        letterBMinus: letters.letterBMinus,
        letterCPlus: letters.letterCPlus,
        letterC: letters.letterC,
        letterCMinus: letters.letterCMinus,
        letterDPlus: letters.letterDPlus,
        letterD: letters.letterD,
        letterF: letters.letterF,
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
    let state = [...gtbreakdown];
    for (const grade of gtbreakdown) {
      if (grade.fgExisting) {
        editFinalGrade(grade.gtid);
      } else {
        state = newFinalGrade(grade.gtid, state);
      }
    }
    setGTBreakdown(state);
    noteArea.ltExisting ? editLetterGrade() : newLetterGrade();
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

  const classes = useStyles();

  return (
    <Container>
      <GradeTitle />
      <TitleText />
      <GradeTable
        gtbreakdown={gtbreakdown}
        addNewRow={addNewRow}
        inputChangeHandler={inputChangeHandler}
        handleWeightChange={handleWeightChange}
        deleteRowHandler={deleteRowHandler}
        gradeSubtotal={gradeSubtotal}
      />
      <NotesTitle />
      <TextField
        id="grade-notes"
        name="notes"
        placeholder="Enter notes about grade breakdown"
        multiline
        fullWidth={true}
        onChange={handleNoteChange}
      />
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
