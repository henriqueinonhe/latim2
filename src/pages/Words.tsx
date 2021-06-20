import React from "react";
import { Exercise } from "../components/Exercise";
import { PageTitle } from "../components/PageTitle";
import { generateExerciseEntryList, generateWordExerciseEntry } from "../logic";

export const Words = React.memo(() => {
  return (
    <>
      <PageTitle>Palavras</PageTitle>

      <Exercise 
        exerciseEntries={generateExerciseEntryList(generateWordExerciseEntry, 20)}
      />
    </>
  );
});

Words.displayName = "Words";