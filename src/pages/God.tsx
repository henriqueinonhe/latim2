import React from "react";
import { Exercise } from "../components/Exercise";
import { PageTitle } from "../components/PageTitle";
import { generateExerciseEntryList, generateGodExerciseEntry } from "../logic";


export const God = React.memo(() => {
  return (
    <>
      <PageTitle>Deus</PageTitle>

      <Exercise 
        exerciseEntries={generateExerciseEntryList(generateGodExerciseEntry, 20)}
      />
    </>
  );
});

God.displayName = "God";