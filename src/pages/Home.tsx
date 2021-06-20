import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { PageTitle } from "../components/PageTitle";

const Grid = styled.div`
  display: flex;
  margin-left: -10px;
  margin-right: -10px;
`;

const GridItem = styled.div`
  width: 33.33%;
  padding: 10px;
`;

const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 2px solid #72d8aa;
  padding: 10px;
  border-radius: 7px;
  height: 100%;

  &:hover {
    background-color: #c5ffe5;
  }
`;

const ExerciseCardTitle = styled.h3``;

const ExerciseCardSubTitle = styled.div``;

export const Home = React.memo(() => {
  const history = useHistory();

  return (
    <>
      <PageTitle>Exercícios</PageTitle>

      <Grid>
        <GridItem>
          <ExerciseCard
            onClick={() => history.push("/declinations")}
          >
            <ExerciseCardTitle>Declinações</ExerciseCardTitle>
            <ExerciseCardSubTitle>Dê a terminação das declinações</ExerciseCardSubTitle>
          </ExerciseCard>
        </GridItem>
            
        <GridItem>
          <ExerciseCard
            onClick={() => history.push("/god")}
          >
            <ExerciseCardTitle>Deus</ExerciseCardTitle>
            <ExerciseCardSubTitle>Dê a conjugação de &quot;deus&quot; em cada caso</ExerciseCardSubTitle>
          </ExerciseCard>
        </GridItem>

        <GridItem>
          <ExerciseCard
            onClick={() => history.push("/words")}
          >
            <ExerciseCardTitle>Palavras</ExerciseCardTitle>
            <ExerciseCardSubTitle>Dê a declinação e gênero das palavras</ExerciseCardSubTitle>
          </ExerciseCard>
        </GridItem>
      </Grid>
    </>
  );
});

Home.displayName = "Main";