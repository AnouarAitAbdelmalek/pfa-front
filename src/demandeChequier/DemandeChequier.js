import Axios from "axios";
import React, { Component } from "react";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import NavigationBar from "../shared/NavigationBar";
import ToastComponent from "../shared/ToastComponent";



class DemandeChequier extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.demandeChequier = this.initialState;
    this.state.comptes = [];
    this.state.show = false;
    this.state.see = false;
    this.state.type = "";
    this.state.password = "";
    this.state.currentPage = 1;
    this.state.numberPerPage = 2;
  }

  initialState = {
    id: "",
    motif: "",
    montantChequier: "",
    dateExecution: "",
    statut: "",
    compte: {
      id: "",
      numeroCompte: "",
    },
  };

  componentWillMount() {
    
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ demandeChequier: this.initialState });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.getAllComptes();

    const demandeChequierIdEdit = +this.props.match.params.idEdit;
    if (demandeChequierIdEdit) {
      this.getDemandeChequier(demandeChequierIdEdit);
      this.setState({ see: false });
    }

    const demandeChequierIdSee = +this.props.match.params.idSee;
    if (demandeChequierIdSee) {
      this.getDemandeChequier(demandeChequierIdSee);
      this.setState({ see: true });
    }
  }

  getDemandeChequier(id) {
    let authString = sessionStorage.getItem('basicauth');
    
    Axios.get("http://localhost:8083/demandeChequier?id=" + id,
    {headers : {authorization : authString}})
    .then(response => response.data)
    .then(data => {
      if (data != null) {
        this.setState({demandeChequier: data});
      } else {
        alert("dalee");
      }
    })

    
  }

  getAllComptes = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8083/abonne/"+sessionStorage.getItem('id')+"/comptes",
    {headers : {authorization : authString}})
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          comptes: [{ value: "", display: "Choisissez un compte..." }].concat(
            data.map((compte) => {
              return {
                value: compte.numeroCompte,
                display: compte.numeroCompte,
              };
            })
          ),
        });
      });
  };

  submitDemandeChequier = (event) => {
    event.preventDefault();

    const demandeChequier = {
      motif: this.state.demandeChequier.motif,
      dateExecution: this.state.demandeChequier.dateExecution,
      montantChequier: this.state.demandeChequier.montantChequier,
      compte: {
        id: this.state.demandeChequier.compte.id,
        numeroCompte: this.state.demandeChequier.compte.numeroCompte,
      },
    };

    let authString = sessionStorage.getItem('basicauth');
    
    Axios.post(
      "http://localhost:8083/demandeChequier",
      demandeChequier,
      {headers : {authorization : authString}}
    ).then((response) => response.data)
    .then(data => {
      setTimeout(() => {
        if (data != null) {
          this.setState({
            show: true,
            type: "success",
          });
          setTimeout(() => {
            this.setState({ show: false });
            return this.props.history.push("/listDemandeChequier");
          }, 3000);
        } else {
          this.setState({
            show: false,
            type: "",
          });
        }
      }, 200);
    })
    ;

    this.setState({ demandeChequier: this.initialState });
  };

  updateDemandeChequier = (event) => {
    event.preventDefault();

    const demandeChequier = {
      id: this.state.demandeChequier.id,
      motif: this.state.demandeChequier.motif,
      dateExecution: this.state.demandeChequier.dateExecution,
      montantChequier: this.state.demandeChequier.montantChequier,
      compte: {
        id: this.state.demandeChequier.compte.id,
        numeroCompte: this.state.demandeChequier.compte.numeroCompte,
      },
    };

    let authString = sessionStorage.getItem('basicauth');
    

    Axios.put(
      "http://localhost:8083/demandeChequier/" + this.state.demandeChequier.id,
      demandeChequier,
      {headers : {authorization : authString}}
    ).then(response => response.data)
    .then(data => {
      setTimeout(() => {
        if (data != null) {
          this.setState({
            show: true,
            type: "danger",
          });
          setTimeout(() => {
            this.setState({ show: false });
            return this.props.history.push("/listDemandeChequier");
          }, 3000);
        } else {
          this.setState({
            show: false,
            type: "",
          });
        }
      }, 200);
    });

    
    this.setState({ demandeChequier: this.initialState });
  };

  signerDemandeChequier = (event) => {
    event.preventDefault();

    const pswd = this.state.password;
    
    let authString = sessionStorage.getItem('basicauth');
    const verification = 'Basic ' + window.btoa(sessionStorage.getItem('username') + ':' + pswd)
    if(authString === verification)
    {
      Axios.get(
        "http://localhost:8083/demandeChequier/signer/" + this.state.demandeChequier.id,
      {headers : {authorization : authString}}
      ).then(response => response.data)
      .then(data => {
        setTimeout(() => {
          if (data != null) {
            this.setState({
              show: true,
              type: "primary",
            });
            setTimeout(() => {
              this.setState({ show: false });
              return this.props.history.push("/listDemandeChequier");
            }, 3000);
          } else {
            this.setState({
              show: false,
              type: "",
            });
          }
        }, 200);
      });
  
      this.setState({ demandeChequier: this.initialState });
    }
    else {
      alert("Mot de passe incorrect !");
      this.setState({...this.state,
      password: ""})
    }

    
  };

  demandeChequierChange = (event) => {
    
     if(event.target.name === "numeroCompte")
     {
      
      this.setState({ ...this.state,
         demandeChequier: { ...this.state.demandeChequier,
           compte: {
             ...this.state.demandeChequier.compte,
             numeroCompte: event.target.value
           }
         }
       });
       
     }
     else if(event.target.name === "password")
     {
      this.setState({ ...this.state,
        password: event.target.value
        
      });
     }
     else
     {
       this.setState({ ...this.state,
         demandeChequier: {
           ...this.state.demandeChequier,
           [event.target.name]: event.target.value
         }
       });
     }
     
  };

  render() {
    const { show, type, password, see, comptes } = this.state;


    return (
      
      <div>
        <NavigationBar/>
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>
        <div style={{ dispaly: show ? "block" : "none" }}>
          <ToastComponent show={show} type={type} />
        </div>

        <Card className="border border-dark text-white bg-dark">
          <Card.Header>
            {this.state.demandeChequier.id
              ? see
                ? "Signature demande chéquier"
                : "Modification demande chéquier"
              : "Création demande chéquier"}
          </Card.Header>
          <Form
            onSubmit={
              this.state.demandeChequier.id
                ? see
                  ? this.signerDemandeChequier
                  : this.updateDemandeChequier
                : this.submitDemandeChequier
            }
            id="demandeChequierFormId"
          >
            <Card.Body>
              <Form.Group controlId="formGridNumeroCompte">
                <Form.Label>Numéro compte</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.demandeChequier.compte.numeroCompte}
                  onChange={this.demandeChequierChange}
                  required
                  className="bg-dark text-white"
                  name="numeroCompte"
                  disabled={see ? true : false}
                  custom={see ? true : false}
                >
                  {comptes.map((compte) => (
                    <option key={compte.value} value={compte.value}>
                      {compte.display}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formGridMotif">
                <Form.Label>Motif</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.demandeChequier.motif}
                  onChange={this.demandeChequierChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez le motif de votre demande..."
                  className="bg-dark text-white"
                  name="motif"
                  disabled={see ? true : false}
                />
              </Form.Group>

              <Form.Group controlId="formGridMontantChequier">
                <Form.Label>Montant chéquier</Form.Label>
                <Form.Control
                  type="number"
                  step="0.05"
                  min="0"
                  value={this.state.demandeChequier.montantChequier}
                  onChange={this.demandeChequierChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez le montant souhaité..."
                  className="bg-dark text-white"
                  name="montantChequier"
                  disabled={see ? true : false}
                />
              </Form.Group>

              <Form.Group controlId="formGridDateExecution">
                <Form.Label>Date d'exécution</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.demandeChequier.dateExecution}
                  onChange={this.demandeChequierChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez la date d'exécution..."
                  className="bg-dark text-white"
                  name="dateExecution"
                  disabled={see ? true : false}
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              {this.state.demandeChequier.id ? (
                see ? (
                  this.state.demandeChequier.statut === "Signée" ? (
                    <div />
                  ) : (
                    <Form.Row>
                      <Col>
                        <Button variant="success" type="submit">
                          Signer
                        </Button>
                      </Col>
                      <Col>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={this.demandeChequierChange}
                          autoComplete="off"
                          required
                          placeholder="Saisissez votre mot de passe..."
                          className="bg-dark text-white"
                          name="password"
                        />
                      </Col>
                    </Form.Row>
                  )
                ) : (
                  <Button variant="success" type="submit">
                    Modifier
                  </Button>
                )
              ) : (
                <Button variant="success" type="submit">
                  Enregistrer
                </Button>
              )}
            </Card.Footer>
          </Form>
        </Card>
        </Col>
        </Row>
        </Container>
      </div>
    );
  }
}

export default DemandeChequier;