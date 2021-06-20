import { isArray } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { answerIsCorrect, ExerciseEntry } from "../logic";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryDisplay = styled.div`
  font-size: calc(22px * 1.25);
`;

const QuestionDisplay = styled.div`
  font-size: calc(18px * 1.25);
`;

type UserAnswerInputStatus = "Correct" | "Incorrect" | "Neutral";

interface UserAnswerInputProps {
  status : UserAnswerInputStatus;
}

const UserAnswerInput = styled.input<UserAnswerInputProps>`
  border: none;
  border-bottom: 1px solid #333;
  width: calc(200px * 1.25);
  text-align: center;
  font-size: calc(20px * 1.25);
  background-color: ${props => props.status === "Correct" ? "#b4f5dc" : props.status === "Incorrect" ? "#fadddd" : "transparent"};

  &:focus {
    outline: none;
    border-bottom: 2px solid #333;
    margin-bottom: -1px;
  }

  &:hover {
    border-bottom: 2px solid #333;
    margin-bottom: -1px;
  }
`;

const SubmitButton = styled.button`
  width: calc(1.25 * 200px);
  margin-top: calc(1.25 * 12px);
  font-size: calc(1.25 * 18px);
`;

const ActualAnswerDisplay = styled.div`
  font-size: calc(1.25 * 20px);
  color: #72e472;
  height: calc(1.25 * 42px);
`;

type ExerciseState = "Question" | "Answer" | "Finished";

function formatAnswer(answer : string | Array<string>) : string {
  if(isArray(answer)) {
    return answer.join(" ou");
  }

  return answer;
}

export interface ExerciseProps {
  exerciseEntries : Array<ExerciseEntry>;
}

export function Exercise(props : ExerciseProps) : JSX.Element {
  const {
    exerciseEntries
  } = props;

  const [currentExeciseEntryIndex, setCurrentExerciseEntryIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [userAnswerInputStatus, setUserAnswerInputStatus] = useState<UserAnswerInputStatus>("Neutral");
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [state, setState] = useState<ExerciseState>("Question");
  const userAnswerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCorrectAnswerCount(0);
    setCurrentExerciseEntryIndex(0);
    setState("Question");
    setUserAnswer("");
  }, [exerciseEntries]);

  const currentExerciseEntry = exerciseEntries[currentExeciseEntryIndex];

  function handleSubmitButtonClicked() : void {
    if(state !== "Answer") {
      setState("Answer");

      const userAnswerIsCorrect = answerIsCorrect(currentExerciseEntry.answer, userAnswer);
      setUserAnswerInputStatus(userAnswerIsCorrect ? "Correct" : "Incorrect");
  
      setTimeout(() => {
        userAnswerIsCorrect && setCorrectAnswerCount(count => count + 1);
        
        if(currentExeciseEntryIndex + 1 < exerciseEntries.length) {
          setCurrentExerciseEntryIndex(index => index + 1);
          setState("Question");
        }
        else {
          setState("Finished");
        }

        setUserAnswer("");
        setUserAnswerInputStatus("Neutral");
        userAnswerInputRef.current!.focus();
      }, 1200);
    }
  }

  function handleUserAnswerInputKeyDown(event : React.KeyboardEvent) : void {
    const key = event.key;
    const altKey = event.altKey;

    if(key === "Enter") {
      handleSubmitButtonClicked();
    }
    else if(altKey) {
      if(key === "a") {
        setUserAnswer(answer => answer + "ā");
      }
      else if(key === "i") {
        setUserAnswer(answer => answer + "ī");
      }
      else if(key === "o") {
        setUserAnswer(answer => answer + "ō");
      }
      else if(key === "e") {
        setUserAnswer(answer => answer + "ē");
        event.preventDefault();
      }
      else if(key === "u") {
        setUserAnswer(answer => answer + "ū");
      }
    }
  }

  return (
    <Container>
      <SummaryDisplay>
        {`Acertos: ${correctAnswerCount} Erros: ${currentExeciseEntryIndex - correctAnswerCount} Questão: ${currentExeciseEntryIndex} / ${exerciseEntries.length}`}
      </SummaryDisplay>

      <QuestionDisplay>
        {
          state === "Question" || state === "Answer" ?
            currentExerciseEntry.question :
            "Fim!"
        }
      </QuestionDisplay>

      <ActualAnswerDisplay>
        {
          state === "Answer" && !answerIsCorrect(currentExerciseEntry.answer, userAnswer) &&
          formatAnswer(currentExerciseEntry.answer)
        }
      </ActualAnswerDisplay>

      <UserAnswerInput 
        value={userAnswer}
        onChange={event => setUserAnswer(event.target.value)}
        disabled={state === "Answer"}
        onKeyDown={handleUserAnswerInputKeyDown}
        status={userAnswerInputStatus}
        ref={userAnswerInputRef}
      />

      <SubmitButton
        onClick={handleSubmitButtonClicked}
      >
        Corrigir
      </SubmitButton>
    </Container>
  );
}