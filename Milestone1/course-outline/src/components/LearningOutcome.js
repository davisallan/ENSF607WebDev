import { React, useState, useEffect, useCallback } from "react";
import {
  Table,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import GraduateAttribute from "./GraduateAttribute";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justify: "center",
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  table: {
    minWidth: 650,
  },
  text: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
}));

export default function LearningOutcome({ courseId, newOutline }) {
  let outcomeNum = 1;

  const [learningOutcome, setLearningOutcome] = useState([
    {
      id: uuidv4(),
      description: "",
      outcomeExisting: false,
    },
  ]);

  const [attribute, setAttribute] = useState([]);

  const learningOutcomeRetrieval = useCallback(async () => {
    var outcomes = [];
    await axios
      .get(`http://127.0.0.1:8000/learningOutcome/?courseId=${courseId}`)
      .then(function (response) {
        for (const outcome of response.data) {
          outcomes.push({
            id: outcome.outcomeId,
            description: outcome.outcomeDescription,
            outcomeExisting: true,
          });
        }
        setLearningOutcome(outcomes);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [courseId]);

  useEffect(() => {
    if (!newOutline) {
      learningOutcomeRetrieval();
    }
  }, [newOutline, learningOutcomeRetrieval]);

  // function graduateAttrRetrieval() {
  //   axios
  //     .get(`http://127.0.0.1:8000/graduateAttribute/?courseId=${courseId}`)
  //     .then(function (response) {
  //       for (const gradAttr of response.data) {
  //         gradAttrInfo.push({
  //           gradId: gradAttr.gradId,
  //           outcomeNumber: gradAttr.outcomeNumber,
  //           graduateAttribute: gradAttr.graduateAttribute,
  //           instructionLevel: gradAttr.instructionLevel,
  //           attributeExisting: true,
  //         });
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   return gradAttrInfo;
  // }

  // function GradAttributeInfo(newOutline) {
  //   if (newOutline) {
  //     return [
  //       {
  //         gradId: uuidv4(),
  //         outcomeNumber: "",
  //         graduateAttribute: "",
  //         instructionLevel: "",
  //         attributeExisting: false,
  //       },
  //     ];
  //   } else {
  //     return graduateAttrRetrieval();
  //   }
  // }

  function addNewOutcomeRow() {
    setLearningOutcome([
      ...learningOutcome,
      {
        id: uuidv4(),
        description: "",
        outcomeExisting: false,
      },
    ]);
  }

  function handleOutcomeChange(e, i) {
    let result = learningOutcome.map((learningOutcome) => {
      return learningOutcome.id === i
        ? {
            ...learningOutcome,
            [e.target.name]: e.target.value,
          }
        : {
            ...learningOutcome,
          };
    });
    setLearningOutcome(result);
  }

  function deleteOutcomeRow(id) {
    deleteLearningOutcome(id);
    const temp = [...learningOutcome];
    const filteredRow = temp.filter(
      (learningOutcome) => learningOutcome.id !== id
    );
    setLearningOutcome([...filteredRow]);
  }

  function addNewAttributeRow() {
    setAttribute([
      ...attribute,
      {
        gradId: uuidv4(),
        outcomeNumber: "",
        graduateAttribute: "",
        instructionLevel: "",
        attributeExisting: false,
      },
    ]);
  }

  function handleAttributeChange(e, i) {
    let result = attribute.map((attribute) => {
      return attribute.gradId === i
        ? {
            ...attribute,
            [e.target.name]: e.target.value,
          }
        : {
            ...attribute,
          };
    });
    setAttribute(result);
  }

  function deleteAttributeRow(id) {
    deleteGradAttribute(id);
    const temp = [...attribute];
    const filteredRow = temp.filter((attribute) => attribute.gradId !== id);
    setAttribute([...filteredRow]);
  }

  function newLearningOutcome(id, count, state) {
    let result = state.map((learningOutcome) => {
      if (learningOutcome.id === id) {
        axios
          .post("http://127.0.0.1:8000/learningOutcome/", {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            outcomeId: learningOutcome.id,
            outcomeNumber: count,
            outcomeDescription: learningOutcome.description,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        return { ...learningOutcome, outcomeExisting: true };
      } else {
        return { ...learningOutcome };
      }
    });
    return result;
  }

  function editLearningOutcome(id, count) {
    for (const outcome of learningOutcome) {
      if (outcome.id === id) {
        axios
          .put(`http://127.0.0.1:8000/learningOutcome/${outcome.id}/`, {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            outcomeId: outcome.id,
            outcomeNumber: count,
            outcomeDescription: outcome.description,
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

  function deleteLearningOutcome(id) {
    for (const outcome of learningOutcome) {
      if (outcome.id === id) {
        if (outcome.outcomeExisting) {
          axios
            .delete(`http://127.0.0.1:8000/learningOutcome/${outcome.id}/`, {})
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }

  function newGradAttribute(id, state) {
    let result = state.map((attribute) => {
      if (attribute.gradId === id) {
        axios
          .post("http://127.0.0.1:8000/graduateAttribute/", {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            gradId: attribute.gradId,
            outcomeNumber: attribute.outcomeNumber,
            graduateAttribute: attribute.graduateAttribute,
            instructionLevel: attribute.instructionLevel,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        return { ...attribute, attributeExisting: true };
      } else {
        return { ...attribute };
      }
    });
    return result;
  }

  function editGradAttribute(id) {
    for (const gradAttr of attribute) {
      if (gradAttr.gradId === id) {
        axios
          .put(`http://127.0.0.1:8000/graduateAttribute/${gradAttr.gradId}/`, {
            courseId: `http://127.0.0.1:8000/calendarInfo/${courseId}/`,
            gradId: gradAttr.gradId,
            outcomeNumber: gradAttr.outcomeNumber,
            graduateAttribute: gradAttr.graduateAttribute,
            instructionLevel: gradAttr.instructionLevel,
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

  function deleteGradAttribute(id) {
    for (const gradAttr of attribute) {
      if (gradAttr.gradId === id) {
        if (gradAttr.attributeExisting) {
          axios
            .delete(
              `http://127.0.0.1:8000/graduateAttribute/${gradAttr.gradId}`,
              {}
            )
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    }
  }

  function saveInfo() {
    //saving learning outcomes
    var count = 1;
    let state = [...learningOutcome];
    for (const outcome of learningOutcome) {
      if (outcome.outcomeExisting) {
        editLearningOutcome(outcome.id, count);
      } else {
        state = newLearningOutcome(outcome.id, count, state);
      }
      count++;
    }
    setLearningOutcome(state);

    //saving graduate attributes
    let gradState = [...attribute];
    for (const gradAttr of attribute) {
      if (gradAttr.attributeExisting) {
        editGradAttribute(gradAttr.gradId);
      } else {
        gradState = newGradAttribute(gradAttr.gradId, gradState);
      }
    }
    setAttribute(gradState);
  }

  const columns = [
    {
      id: "learningOutcome",
      label: "Learning Outcome",
      minWidth: 0,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 300,
    },
  ];

  const classes = useStyles();

  return (
    <Container>
      <div className={classes.root}>
        <Typography variant="h5">2. Learning Outcomes</Typography>
        <Typography variant="subtitle1" align="left">
          At the end of this course, you will be able to:
        </Typography>
        <Paper className={classes.paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontSize: 16,
                      fontWeight: 600,
                      color: "black",
                      backgroundColor: "white",
                    }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <Tooltip title="Insert Row" aria-label="insert">
                    <Fab
                      color="primary"
                      className={classes.fab}
                      onClick={addNewOutcomeRow}
                      size="small">
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {learningOutcome.map((learningOutcome, id) => (
                <TableRow key={id}>
                  <TableCell>
                    <Typography variant="body1" align="left">
                      {outcomeNum++}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="standard-multiline-flexible"
                      placeholder="Outcome description"
                      name="description"
                      value={learningOutcome.description}
                      multiline
                      fullWidth
                      onChange={(e) =>
                        handleOutcomeChange(e, learningOutcome.id)
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <DeleteIcon
                      onClick={() => deleteOutcomeRow(learningOutcome.id)}
                      style={{
                        cursor: "pointer",
                      }}
                      color="secondary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <GraduateAttribute
          attribute={attribute}
          addNewAttributeRow={addNewAttributeRow}
          handleAttributeChange={handleAttributeChange}
          deleteAttributeRow={deleteAttributeRow}
        />
        <Container align="right">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={saveInfo}>
            Save
          </Button>
        </Container>
      </div>
    </Container>
  );
}
