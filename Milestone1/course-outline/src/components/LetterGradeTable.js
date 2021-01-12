import React, { useState, useCallback, useEffect } from "react";
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

var rowCounter = 1;

export default function FinalGradeComponent({
  courseId,
  newOutline,
  setMessageAlert,
  setAlertOpen,
}) {
  const [gtbreakdown, setGTBreakdown] = useState([
    {
      gtid: courseId + rowCounter,
      gradeComponent: "",
      outcomes: "",
      weight: 0,
      fgExisting: false,
    },
  ]);

  const [noteArea, setNoteArea] = useState({
    notes: "",
    infoId: uuidv4(),
    ltExisting: false,
  });

  const letterTableInfo = useCallback(() => {
    return [
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
  }, []);

  const [ltbreakdown, setLTBreakdown] = useState(letterTableInfo);

  const gradeTableRetrieval = useCallback(async () => {
    var gradeTableInfo = [];
    await axios
      .get(`http://127.0.0.1:8000/finalGradeTable/?courseId=${courseId}`)
      .then(function (response) {
        for (const component of response.data) {
          gradeTableInfo.push({
            gtid: component.finalGradeId,
            gradeComponent: component.component,
            outcomes: component.outcomes,
            weight: component.weight,
            fgExisting: true,
          });
        }
        setGTBreakdown(gradeTableInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [courseId]);

  const gradeInfoRetrieval = useCallback(async () => {
    var letterInfo = {
      notes: "",
      infoId: "",
      ltExisting: false,
    };
    var letterTable = letterTableInfo();
    await axios
      .get(`http://127.0.0.1:8000/finalGradeInfo/?courseId=${courseId}`)
      .then(function (response) {
        letterInfo.notes = response.data[0].notes;
        letterInfo.infoId = response.data[0].infoId;
        letterInfo.ltExisting = true;
        console.log(response.data[0].letterAPlus);
        console.log(letterTable);
        letterTable[0].leftRange = response.data[0].letterAPlus;
        letterTable[1].rightRange = response.data[0].letterAPlus;
        letterTable[1].leftRange = response.data[0].letterA;
        letterTable[2].rightRange = response.data[0].letterA;
        letterTable[2].leftRange = response.data[0].letterAMinus;
        letterTable[3].rightRange = response.data[0].letterAMinus;
        letterTable[3].leftRange = response.data[0].letterBPlus;
        letterTable[4].rightRange = response.data[0].letterBPlus;
        letterTable[4].leftRange = response.data[0].letterB;
        letterTable[5].rightRange = response.data[0].letterB;
        letterTable[5].leftRange = response.data[0].letterBMinus;
        letterTable[6].rightRange = response.data[0].letterBMinus;
        letterTable[6].leftRange = response.data[0].letterCPlus;
        letterTable[7].rightRange = response.data[0].letterCPlus;
        letterTable[7].leftRange = response.data[0].letterC;
        letterTable[8].rightRange = response.data[0].letterC;
        letterTable[8].leftRange = response.data[0].letterCMinus;
        letterTable[9].rightRange = response.data[0].letterCMinus;
        letterTable[9].leftRange = response.data[0].letterDPlus;
        letterTable[10].rightRange = response.data[0].letterDPlus;
        letterTable[10].leftRange = response.data[0].letterD;
        letterTable[11].rightRange = response.data[0].letterD;
        letterTable[11].leftRange = response.data[0].letterF;
        setLTBreakdown(letterTable);
        setNoteArea(letterInfo);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [courseId, letterTableInfo]);

  useEffect(() => {
    if (!newOutline) {
      gradeTableRetrieval();
      gradeInfoRetrieval();
    }
  }, [newOutline, gradeTableRetrieval, gradeInfoRetrieval]);

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
    rowCounter++;
    setGTBreakdown([
      ...gtbreakdown,
      {
        gtid: courseId + rowCounter,
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
            if (response.status === 200) {
              setMessageAlert({
                severity: "success",
                message: "Save successful",
              });
              setAlertOpen(true);
            }
          })
          .catch(function (error) {
            console.log(error);
            setMessageAlert({
              severity: "error",
              message:
                "Save failed, please try again. Make sure the Course Number has been saved.",
            });
            setAlertOpen(true);
          });
      }
    }
  }

  function deleteFinalGrade(id) {
    for (const grade of gtbreakdown) {
      if (grade.gtid === id) {
        if (grade.fgExisting) {
          axios
            .delete(`http://127.0.0.1:8000/finalGradeTable/${grade.gtid}/`)
            .then(function (response) {
              console.log(response);
              if (response.status === 204) {
                setMessageAlert({
                  severity: "success",
                  message: "Row deleted.",
                });
                setAlertOpen(true);
              }
            })
            .catch(function (error) {
              console.log(error);
              setMessageAlert({
                severity: "error",
                message: "Delete failed. Please try again.",
              });
              setAlertOpen(true);
            });
        }
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
            if (response.status === 201) {
              setMessageAlert({
                severity: "success",
                message: "Save successful",
              });
              setAlertOpen(true);
            }
          })
          .catch(function (error) {
            console.log(error);
            setMessageAlert({
              severity: "error",
              message:
                "Save failed, please try again. Make sure the Course Number has been saved.",
            });
            setAlertOpen(true);
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
        if (response.status === 200) {
          setMessageAlert({
            severity: "success",
            message: "Save successful",
          });
          setAlertOpen(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessageAlert({
          severity: "error",
          message:
            "Save failed, please try again. Make sure the Course Number has been saved.",
        });
        setAlertOpen(true);
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
        if (response.status === 201) {
          setMessageAlert({
            severity: "success",
            message: "Save successful",
          });
          setAlertOpen(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessageAlert({
          severity: "error",
          message:
            "Save failed, please try again. Make sure the Course Number has been saved.",
        });
        setAlertOpen(true);
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
        deleteFinalGrade={deleteFinalGrade}
        gradeSubtotal={gradeSubtotal}
      />
      <NotesTitle />
      <TextField
        id="grade-notes"
        name="notes"
        placeholder="Enter notes about grade breakdown"
        multiline
        value={noteArea.notes}
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
