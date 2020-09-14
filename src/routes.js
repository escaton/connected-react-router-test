import React from "react";
import { Switch, Route } from "react-router-dom";
import { Player } from "./components/Player";

const FilmPage = () => <Player type="film" />;
const TrailerPage = () => <Player type="trailer" />;

export default () => (
  <Switch>
    <Route path="/film/:contentId" component={FilmPage} />
    <Route path="/trailer/:contentId" component={TrailerPage} />
  </Switch>
);
