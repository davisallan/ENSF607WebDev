import React from "react";
import {
  Table,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

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

export default function GradeTable({
  gtbreakdown,
  addNewRow,
  inputChangeHandler,
  handleWeightChange,
  deleteRowHandler,
  deleteFinalGrade,
  gradeSubtotal,
}) {
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
                    color: "black",
                    backgroundColor: "white",
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
                    size="small"
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gtbreakdown.map((gtbreakdown, gtid) => (
              <TableRow key={gtid}>
                <TableCell>
                  <TextField
                    name="gradeComponent"
                    placeholder="Component description"
                    value={gtbreakdown.gradeComponent}
                    style={{ width: "30rem" }}
                    onChange={(e) => inputChangeHandler(e, gtbreakdown.gtid)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="outcomes"
                    placeholder="Applicable learning outcomes"
                    value={gtbreakdown.outcomes}
                    style={{ width: "29rem" }}
                    onChange={(e) => inputChangeHandler(e, gtbreakdown.gtid)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="weight"
                    value={gtbreakdown.weight}
                    inputProps={{ style: { textAlign: "center" } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleWeightChange(e, gtbreakdown.gtid)}
                  />
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={() => {
                      deleteRowHandler(gtbreakdown.gtid);
                      deleteFinalGrade(gtbreakdown.gtid);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    color="secondary"
                  />
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
                  color: "black",
                  backgroundColor: "white",
                }}
              >
                Total
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "black",
                  backgroundColor: "white",
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
