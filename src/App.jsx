import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";
import CountrySearch from "./CountrySearch";

const App = () => (
  <div className="App" style={{ textAlign: "center" }}>
    <Switch>
      <Route exact path="/" component={Countries} />
      <Route path="/country/:code" component={CountryDetail} />
      {/*<Route path="/search" component={CountrySearch} /> */}
    </Switch>
  </div>
);

export default App;
