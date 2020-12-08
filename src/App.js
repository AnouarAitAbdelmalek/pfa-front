import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";

import NavigationBar from "./shared/NavigationBar";
import DemandeChequier from "./demandeChequier/DemandeChequier";
import ListDemandeChequier from "./demandeChequier/ListDemandeChequier";
import Logout from "./logout/Logout";
import Login from "./login/Login";

function App() {
  const marginTop = {
    marginTop: "25px",
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={marginTop}>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Login} />
              <Route path="/list" exact component={ListDemandeChequier} />
              <Route path="/add" exact component={DemandeChequier} />
              <Route path="/edit/:idEdit" exact component={DemandeChequier} />
              <Route path="/see/:idSee" exact component={DemandeChequier} />
              <Route path="/logout" exact component={Logout} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
