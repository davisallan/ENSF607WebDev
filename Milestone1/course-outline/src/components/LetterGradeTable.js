import React, { useState } from "react";
import {
  Table,
  Paper,
  Container,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justify: "center",
  },
  paper: {
    marginTop: theme.spacing(2),
    width: "43%",
    marginBottom: theme.spacing(1),
  },
  table: {
    width: 300,
  },
}));

export default function LetterTable() {
  // function createData(id, letter, leftRange, comparison, rightRange) {
  //   return { id, letter, leftRange, comparison, rightRange };
  // }

  // var rows = [
  //   createData(uuidv4(), "A+", "", "T >=", "95.0"),
  //   createData(uuidv4(), "A", "90.0", "<= T <", "95.0"),
  //   createData(uuidv4(), "A-", "85.0", "<= T <", "90.0"),
  //   createData(uuidv4(), "B+", "80.0", "<= T <", "85.0"),
  //   createData(uuidv4(), "B", "75.0", "<= T <", "80.0"),
  //   createData(uuidv4(), "B-", "70.0", "<= T <", "75.0"),
  //   createData(uuidv4(), "C+", "65.0", "<= T <", "70.0"),
  //   createData(uuidv4(), "C", "60.0", "<= T <", "65.0"),
  //   createData(uuidv4(), "C-", "56.0", "<= T <", "60.0"),
  //   createData(uuidv4(), "D+", "53.0", "<= T <", "56.0"),
  //   createData(uuidv4(), "D", "50.0", "<= T <", "53.0"),
  //   createData(uuidv4(), "F", "", "T <", "50.0"),
  // ];

  const [breakdown, setBreakdown] = useState([
    {
      id: uuidv4(),
      letter: "A+",
      leftRange: "",
      comparison: "T >=",
      rightRange: "95.0",
    },
    {
      id: uuidv4(),
      letter: "A",
      leftRange: "90.0",
      comparison: "<= T <",
      rightRange: "95.0",
    },
    {
      id: uuidv4(),
      letter: "A-",
      leftRange: "85.0",
      comparison: "<= T <",
      rightRange: "90.0",
    },
    {
      id: uuidv4(),
      letter: "B+",
      leftRange: "80.0",
      comparison: "<= T <",
      rightRange: "85.0",
    },
    {
      id: uuidv4(),
      letter: "B",
      leftRange: "75.0",
      comparison: "<= T <",
      rightRange: "80.0",
    },
    {
      id: uuidv4(),
      letter: "B-",
      leftRange: "70.0",
      comparison: "<= T <",
      rightRange: "75.0",
    },
    {
      id: uuidv4(),
      letter: "C+",
      leftRange: "65.0",
      comparison: "<= T <",
      rightRange: "70.0",
    },
    {
      id: uuidv4(),
      letter: "C",
      leftRange: "60.0",
      comparison: "<= T <",
      rightRange: "65.0",
    },
    {
      id: uuidv4(),
      letter: "C-",
      leftRange: "56.0",
      comparison: "<= T <",
      rightRange: "60.0",
    },
    {
      id: uuidv4(),
      letter: "D+",
      leftRange: "53.0",
      comparison: "<= T <",
      rightRange: "56.0",
    },
    {
      id: uuidv4(),
      letter: "D",
      leftRange: "50.0",
      comparison: "<= T <",
      rightRange: "53.0",
    },
    {
      id: uuidv4(),
      letter: "F",
      leftRange: "",
      comparison: "T <",
      rightRange: "50.0",
    },
    // rows.forEach((row) => {
    //   (id = row.id),
    //     (letter = row.letter),
    //     (leftRange = row.leftRange),
    //     (comparison = row.comparison),
    //     (rightRange = row.rightRange);
    // }),
  ]);

  function handleChange(e, i) {
    const onlyNums = e.target.value.replace(/[^0-9]\./g, "");
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

  const classes = useStyles();

  return (
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
              {breakdown.map((breakdown, id) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row" align="center">
                    {breakdown.letter}
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="leftRange"
                      value={breakdown.leftRange}
                      inputProps={{ style: { textAlign: "center" } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      style={{ width: "5rem" }}
                      onChange={(e) => handleChange(e, breakdown.id)}
                    />
                  </TableCell>
                  <TableCell align="center">{breakdown.comparison}</TableCell>
                  <TableCell>
                    <TextField
                      name="rightRange"
                      value={breakdown.rightRange}
                      inputProps={{ style: { textAlign: "center" } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                      style={{ width: "5rem" }}
                      onChange={(e) => handleChange(e, breakdown.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </div>
  );
}
