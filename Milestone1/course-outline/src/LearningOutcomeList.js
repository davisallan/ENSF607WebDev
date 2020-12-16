import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Outcome from "./Outcome";
import { v4 as uuidv4 } from "uuid";

export default function LearningOutcomeList() {
  const [learningOutcomes, setOutcomes] = useState([]);

  function handleAddOutcome() {
    setOutcomes((prevLearningOutcomes) => {
      return [...prevLearningOutcomes, { id: uuidv4() }];
    });
  }

  return (
    <div>
      <Button onClick={handleAddOutcome} variant="contained" color="primary">
        Add Learning Outcome
      </Button>
      <Grid>
        {learningOutcomes.map((outcome) => {
          return <Outcome key={outcome.id} outcome={outcome} />;
        })}
      </Grid>
    </div>
  );
}
