import React from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import "./App.css";

import DemandeChequier from "./demandeChequier/DemandeChequier";
import ListDemandeChequier from "./demandeChequier/ListDemandeChequier";
import Logout from "./logout/Logout";
import Login from "./login/Login";
import ListVirement from "./virement/ListVirement"
import Virement from "./virement/Virement";


function App() {

  let isLogged = sessionStorage.getItem('username') != null ? true : false;

  return (
    
    <Router>
      {isLogged = sessionStorage.getItem('username') != null ? true : false}
            <Switch>
              <Route path="/login" exact component={Login} >
              {isLogged=== true ? <Redirect to="/listDemandeChequier" /> : ""}
              </Route>
              <Route path="/" exact >
              {isLogged=== false ? <Redirect to="/login" /> : <Redirect to="/listDemandeChequier" />}
              </Route>
              <Route path="/listDemandeChequier" exact component={ListDemandeChequier} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/addDemandeChequier" exact component={DemandeChequier} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/editDemandeChequier/:idEdit" exact component={DemandeChequier} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/seeDemandeChequier/:idSee" exact component={DemandeChequier} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/listVirement" exact component={ListVirement} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/addVirement" exact component={Virement} >
                {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/editVirement/:idEdit" exact component={Virement} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/seeVirement/:idSee" exact component={Virement} >
              {isLogged=== false ? <Redirect to="/login" /> : ""}
              </Route>
              <Route path="/logout" exact component={Logout} >
              </Route>
            </Switch>
    </Router>
  );
}

export default App;
