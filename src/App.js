import React from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";

import DemandeChequier from "./demandeChequier/DemandeChequier";
import ListDemandeChequier from "./demandeChequier/ListDemandeChequier";
import Logout from "./logout/Logout";
import Login from "./login/Login";

function App() {

  let isLogged = sessionStorage.getItem('username') != null ? true : false;

  return (
    
    <Router>
      {isLogged = sessionStorage.getItem('username') != null ? true : false}
            <Switch>
              <Route path="/login" exact component={Login} >
              {isLogged=== true ? <Redirect to="/list" /> : ""}
              </Route>
              <Route path="/" exact >
              {isLogged=== false ? <Redirect to="/login" /> : <Redirect to="/list" />}
              </Route>
              <Route path="/list" exact component={ListDemandeChequier} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/add" exact component={DemandeChequier} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/edit/:idEdit" exact component={DemandeChequier} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/see/:idSee" exact component={DemandeChequier} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/logout" exact component={Logout} >
              </Route>
            </Switch>
    </Router>
  );
}

export default App;
