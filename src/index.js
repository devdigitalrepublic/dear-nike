import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { All, Untagged, Tagged } from "./screens";

ReactDOM.render(
  <Router>
    <div className="app-container">
      <Switch>
        <Route exact path="/" component={All}></Route>
        <Route exact path="/tagged" component={Tagged}></Route>
        <Route exact path="/untagged" component={Untagged}></Route>
        <Route exact path="/feedback" component={App}></Route>
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
