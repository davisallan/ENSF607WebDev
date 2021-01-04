import React, { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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

export default function GraduateAttribute({ numOutcomes }) {
  const [attribute, setAttribute] = useState([
    {
      id: uuidv4(),
      learningOutcome: "",
      graduateAttribute: "",
      instructionLevel: "",
    },
  ]);

  const columns = [
    {
      id: "learningOutcome",
      label: "Learning Outcome",
      minWidth: 300,
    },
    {
      id: "graduateAttribute",
      label: "Graduate Attribute",
      minWidth: 300,
    },
    {
      id: "instructionLevel",
      label: "Instruction Level",
      minWidth: 20,
      align: "center",
    },
  ];

  function addNewRow() {
    setAttribute([
      ...attribute,
      {
        id: uuidv4(),
        learningOutcome: "",
        graduateAttribute: "",
        instructionLevel: "",
      },
    ]);
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
                    color: "black",
                    backgroundColor: "white",
                  }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="right">
                <Tooltip title="Insert Row" aria-label="insert">
                  <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={addNewRow}
                    size="small">
                    <AddIcon />
                  </Fab>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attribute.map((attribute, id) => (
              <TableRow key={id}>
                <TableCell>
                  <TextField
                    name="outcome"
                    placeholder="Learning Outcome #"
                    value={attribute.learningOutcome}
                  />
                </TableCell>
                <TableCell>
                  <Select>
                    <MenuItem value={1}>
                      A1. A knowledge base for engineering
                    </MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
