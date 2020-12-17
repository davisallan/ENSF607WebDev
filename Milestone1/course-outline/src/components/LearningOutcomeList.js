import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Outcome from "./Outcome";
import { v4 as uuidv4 } from "uuid";

export default function LearningOutcomeList() {
  const [learningOutcomes, setOutcomes] = useState([]);
  let outcomeNumber = 1;

  function handleAddOutcome() {
    setOutcomes((prevLearningOutcomes) => {
      return [...prevLearningOutcomes, { id: uuidv4() }];
    });
  }

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
    <Container>
      <Button onClick={handleAddOutcome} variant="contained" color="primary">
        Add Learning Outcome
      </Button>
      <Typography variant="h5">2. Learning Outcomes</Typography>

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
    </Container>
  );
}
