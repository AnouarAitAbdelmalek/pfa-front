import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Logout extends Component {
  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <h2>Merci d’être passé(e) !</h2>
        <p></p>
        <h6>Nous espérons vous revoir bientôt.</h6>

        <Link to={"login"}>
          <Button variant="primary">Connexion</Button>
        </Link>
      </Jumbotron>
    );
  }
}
