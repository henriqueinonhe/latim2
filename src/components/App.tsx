import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Declinations } from "../pages/Declinations";
import { God } from "../pages/God";
import { Home } from "../pages/Home";
import { Words } from "../pages/Words";
import { GlobalStyles } from "./GlobalStyles";

const Container = styled.div``;

const Header = styled.header`
  height: 125px;
  background-color: #c5ffe5;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;

`;

const HeaderTitle = styled.h1`
  font-size: 40px;
`;

const Version = styled.div`
  font-family: Arial;
  font-size: 12px;
`;

const Main = styled.main`
  width: 80%;
  max-width: 800px;
  min-width: 500px;
  margin: auto;
  margin-top: 60px;
`;

export const App = React.memo(() => {
  return (
    <Container>
      <GlobalStyles />

      <Header>
        <HeaderTitle>Exercícios de Latim</HeaderTitle>
        <Version>v1.0.1</Version>
      </Header>

      <Main>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            
            <Route path="/declinations">
              <Declinations />
            </Route>

            <Route path="/god">
              <God />
            </Route>

            <Route path="/words">
              <Words />
            </Route>
            
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Main>
    </Container>
  );
});

App.displayName = "App";