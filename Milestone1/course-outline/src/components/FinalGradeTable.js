import React, { useState } from "react";
import { Table } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import {
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  Tooltip,
  TextField,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
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
}));

export default function GradeTable() {
  const [breakdown, setBreakdown] = useState([
    {
      id: uuidv4(),
      gradeComponent: "",
      outcomes: "",
      weight: 0,
    },
  ]);

  const columns = [
    {
      id: "gradeComponent",
      label: "Component",
      minWidth: 300,
    },
    {
      id: "outcomes",
      label: "Learning Outcome(s)",
      minWidth: 300,
    },
    {
      id: "weight",
      label: "Weight",
      minWidth: 20,
      align: "center",
    },
  ];

  function addNewRow() {
    setBreakdown([
      ...breakdown,
      {
        id: uuidv4(),
        gradeComponent: "",
        outcomes: "",
        weight: 0,
      },
    ]);
  }

  function subtotal(items) {
    let total = items
      .map(({ weight }) => Number.parseFloat(weight))
      .reduce((sum, i) => sum + i, 0);

    return total > 100 ? "Error" : total;
  }

  const gradeSubtotal = subtotal(breakdown);

  function inputChangeHandler(e, i) {
    let result = breakdown.map((breakdown) => {
      return breakdown.id === i
        ? {
            ...breakdown,
            [e.target.name]: e.target.value,
          }
        : {
            ...breakdown,
          };
    });
    setBreakdown(result);
  }

  function handleWeightChange(e, i) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length >= 0 && onlyNums <= 100) {
      let result = breakdown.map((breakdown) => {
        return breakdown.id === i
          ? {
              ...breakdown,
              [e.target.name]: onlyNums,
            }
          : {
              ...breakdown,
            };
      });
      setBreakdown(result);
    }
  }

  function deleteRowHandler(id) {
    const temp = [...breakdown];
    const filteredRow = temp.filter((breakdown) => breakdown.id !== id);
    setBreakdown([...filteredRow]);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
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
                    color: "white",
                    backgroundColor: "#b71c1c",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Insert Row" aria-label="insert">
                  <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={addNewRow}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {breakdown.map((breakdown, id) => (
              <TableRow key={id}>
                <TableCell>
                  <TextField
                    id="component-input"
                    name="gradeComponent"
                    placeholder="Component Description"
                    value={breakdown.gradeComponent}
                    style={{ width: "30rem" }}
                    onChange={(e) => inputChangeHandler(e, breakdown.id)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="outcome-input"
                    name="outcomes"
                    placeholder="Applicable Learning Outcomes"
                    value={breakdown.outcomes}
                    style={{ width: "29rem" }}
                    onChange={(e) => inputChangeHandler(e, breakdown.id)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="weight-input"
                    name="weight"
                    value={breakdown.weight}
                    inputProps={{ style: { textAlign: "center" } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleWeightChange(e, breakdown.id)}
                  />
                </TableCell>
                <TableCell>
                  {
                    <DeleteIcon
                      onClick={() => deleteRowHandler(breakdown.id)}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={2}
                align="right"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "white",
                  backgroundColor: "#b71c1c",
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "white",
                  backgroundColor: "#b71c1c",
                }}
              >
                {gradeSubtotal}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
