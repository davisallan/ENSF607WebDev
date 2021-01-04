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

  function inputChangeHandler(e, i) {
    let result = attribute.map((attribute) => {
      return attribute.id === i
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

  function deleteRowHandler(id) {
    const temp = [...attribute];
    const filteredRow = temp.filter((attribute) => attribute.id !== id);
    setAttribute([...filteredRow]);
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
              <TableCell align="center">
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
                    name="learningOutcome"
                    placeholder="#"
                    value={attribute.learningOutcome}
                    style={{ width: "10rem" }}
                    onChange={(e) => inputChangeHandler(e, attribute.id)}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    name="graduateAttribute"
                    value={attribute.graduateAttribute}
                    style={{ width: "27rem" }}
                    onChange={(e) => inputChangeHandler(e, attribute.id)}>
                    <MenuItem value={1}>
                      A1. A knowledge base for engineering
                    </MenuItem>
                    <MenuItem value={2}>A2. Problem analysis</MenuItem>
                    <MenuItem value={3}>A3. Investigation</MenuItem>
                    <MenuItem value={4}>A4. Design</MenuItem>
                    <MenuItem value={5}>A5. Use of engineering tools</MenuItem>
                    <MenuItem value={6}>A6. Individual and team work</MenuItem>
                    <MenuItem value={7}>A7. Communication skills</MenuItem>
                    <MenuItem value={8}>A8. Professionalisim</MenuItem>
                    <MenuItem value={9}>
                      A9. Impact of engineering on society/environment
                    </MenuItem>
                    <MenuItem value={10}>A10. Ethics and equity</MenuItem>
                    <MenuItem value={11}>
                      A11. Economics and project management
                    </MenuItem>
                    <MenuItem value={12}>A12. Life-long learning</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    name="instructionLevel"
                    style={{ width: "10rem" }}
                    value={attribute.instructionLevel}
                    onChange={(e) => inputChangeHandler(e, attribute.id)}>
                    <MenuItem value={1}>I (Introduced)</MenuItem>
                    <MenuItem value={2}>D (Developed)</MenuItem>
                    <MenuItem value={3}>A (Applied)</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    onClick={() => deleteRowHandler(attribute.id)}
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
    </div>
  );
}
