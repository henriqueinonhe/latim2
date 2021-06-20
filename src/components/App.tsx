import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { Declinations } from "../pages/Declinations";
import { God } from "../pages/God";
import { Home } from "../pages/Home";
import { Words } from "../pages/Words";
import { GlobalStyles } from "./GlobalStyles";
import { rem } from "polished";

const Container = styled.div``;

const Header = styled.header`
  height: 125px;
  background-color: #c5ffe5;
  padding-top: 30px;
  padding-left: 25px;
`;

const HeaderTitle = styled.h1`
  font-size: 40px;
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