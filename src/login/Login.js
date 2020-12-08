import React, { Component } from "react";
import { Form, Button, Jumbotron } from "react-bootstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  // login = (event) => {
  //   event.preventDefault();

  //   // const headers = new Headers();
  //   // headers.append("Content-Type", "application/json");
  //   const utilisateur = {
  //     username: this.state.username,
  //     password: this.state.password,
  //   };

  //   fetch("http://localhost:8081/demandeChequier/login", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(utilisateur),
  //   })
  //     .then((response) => response.json())
  //     .then(
  //       (data) => {
  //         alert(data);
  //       },
  //       (error) => {
  //         alert("makhdamch had lhzaq");
  //       }
  //     );
  // };

  formChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <Jumbotron className="bg-dark text-white">
        <Form onSubmit={this.login}>
          <Form.Group>
            <Form.Label>Nom d'utilisateur (username)</Form.Label>
            <Form.Control
              type="text"
              value={this.state.username}
              onChange={this.formChange}
              placeholder="Saisissez votre username..."
              name="username"
            />
            <Form.Text className="text-muted">
              Si vous avez oublié votre username, veuillez contacter votre agent
              bancaire.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.formChange}
              placeholder="Saisissez votre mot de passe..."
              name="password"
            />
          </Form.Group>

          <Button href="list" variant="primary" type="submit">
            Connexion
          </Button>
        </Form>
      </Jumbotron>
    );
  }
}
