import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Outcome from "./Outcome";
import GraduateAttribute from "./GraduateAttribute";
import { v4 as uuidv4 } from "uuid";

export default function LearningOutcomeList(props) {
  const [learningOutcomes, setOutcomes] = useState([{ id: uuidv4() }]);
  let outcomeNumber = 1;

  const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(10),
      width: "100%",
      marginBottom: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  function handleAddOutcome() {
    setOutcomes((prevLearningOutcomes) => {
      return [...prevLearningOutcomes, { id: uuidv4() }];
    });
  }
  // function handleAddOutcome() {
  //   props.changeOutcome();
  // }

  function deleteOutcome(id) {
    const newOutcomes = learningOutcomes.filter((outcome) => outcome.id !== id);
    setOutcomes(newOutcomes);
  }

  function updateDescription(e, id) {
    const newOutcomes = [...learningOutcomes];
    const updatedOutcome = newOutcomes.find((outcome) => outcome.id === id);
    updatedOutcome.description = e.target.value;
    setOutcomes(newOutcomes);
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h5">2. Learning Outcomes</Typography>
      <Tooltip title="Add Learning Outcome" aria-label="insert">
        <Fab
          onClick={handleAddOutcome}
          aria-label="add"
          color="primary"
          style={{
            float: "right",
          }}
          size="small"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Typography variant="subtitle1" align="left">
        At the end of this course, you will be able to:
      </Typography>
      {learningOutcomes.map((outcome) => {
        return (
          <Outcome
            key={outcome.id}
            outcome={outcome}
            outcomeNumber={outcomeNumber++}
            deleteOutcome={deleteOutcome}
            description={updateDescription}
          />
        );
      })}
      <GraduateAttribute
        numOutcomes={learningOutcomes.length}
      ></GraduateAttribute>
    </Container>
  );
}
