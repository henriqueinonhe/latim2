import React from "react";
import { Exercise } from "../components/Exercise";
import { PageTitle } from "../components/PageTitle";
import { generateExerciseEntryList, generateDeclinationExerciseEntry } from "../logic";

export const Declinations = React.memo(() => {
  return (
    <>
      <PageTitle>Declinações</PageTitle>

      <Exercise 
        exerciseEntries={generateExerciseEntryList(generateDeclinationExerciseEntry, 20)}
      />
    </>
  );
});

Declinations.displayName = "Declinations";