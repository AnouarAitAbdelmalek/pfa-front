import Axios from "axios";
import React, { Component } from "react";
import { Card, Form, Button, Col, Container, Row } from "react-bootstrap";
import { Route } from "react-router-dom";
import NavigationBar from "../shared/NavigationBar";
import ToastComponent from "../shared/ToastComponent";



class Virement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.virement = this.initialState;
    this.state.comptes = [];
    this.state.beneficiaires = [];
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
    montant: "",
    dateExecution: "",
    statut: "",
    compte: {
      id: "",
      numeroCompte: "",
    },
    beneficiaire: {
      id: "",
      numeroCompte: "",
    },

  };

  componentWillMount() {
    
    this.unlisten = this.props.history.listen((location, action) => {
      this.setState({ virement: this.initialState });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidMount() {
    this.getAllComptes();
    this.getAllBeneficiares();

    const virementIdEdit = +this.props.match.params.idEdit;
    if (virementIdEdit) {
      this.getVirement(virementIdEdit);
      this.setState({ see: false });
    }

    const virementIdSee = +this.props.match.params.idSee;
    if (virementIdSee) {
      this.getVirement(virementIdSee);
      this.setState({ see: true });
    }
  }

  getVirement(id) {
    let authString = sessionStorage.getItem('basicauth');
    
    Axios.get("http://localhost:8082/virement?id=" + id,
    {headers : {authorization : authString}})
    .then(response => response.data)
    .then(data => {
      if (data != null) {
        this.setState({virement: data});
      } else {
        alert("dalee");
      }
    })

    
  }

  getAllComptes = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8082/abonne/"+sessionStorage.getItem('id')+"/comptes",
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

  getAllBeneficiares = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8082/abonne/"+sessionStorage.getItem('id')+"/beneficiaires",
    {headers : {authorization : authString}})
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          beneficiaires: [{ value: "", display: "Choisissez un bénéficiaire..." }].concat(
            data.map((beneficiaire) => {
              return {
                value: beneficiaire.numeroCompte,
                display: beneficiaire.numeroCompte +" "+ beneficiaire.nom + " " + beneficiaire.prenom,
              };
            })
          ),
        });
      });
  };

  submitVirement = (event) => {
    event.preventDefault();

    const virement = {
      motif: this.state.virement.motif,
      dateExecution: this.state.virement.dateExecution,
      montant: this.state.virement.montant,
      compte: {
        id: this.state.virement.compte.id,
        numeroCompte: this.state.virement.compte.numeroCompte,
      },
      beneficiaire: {
        id: this.state.virement.beneficiaire.id,
        numeroCompte: this.state.virement.beneficiaire.numeroCompte,
      },
    };

    let authString = sessionStorage.getItem('basicauth');
    console.log(virement);
    
    Axios.post(
      "http://localhost:8082/virement",
      virement,
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
            return this.props.history.push("/listVirement");
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

    this.setState({ virement: this.initialState });
  };

  updateVirement = (event) => {
    event.preventDefault();

    const virement = {
      id: this.state.virement.id,
      motif: this.state.virement.motif,
      dateExecution: this.state.virement.dateExecution,
      montant: this.state.virement.montant,
      compte: {
        id: this.state.virement.compte.id,
        numeroCompte: this.state.virement.compte.numeroCompte,
      },
      beneficiaire: {
        id: this.state.virement.beneficiaire.id,
        numeroCompte: this.state.virement.beneficiaire.numeroCompte,
      },
    };

    let authString = sessionStorage.getItem('basicauth');
    

    Axios.put(
      "http://localhost:8082/virement/" + this.state.virement.id,
      virement,
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
            return this.props.history.push("/listVirement");
          }, 3000);
        } else {
          this.setState({
            show: false,
            type: "",
          });
        }
      }, 200);
    });

    
    this.setState({ virement: this.initialState });
  };

  signerVirement = (event) => {
    event.preventDefault();

    const pswd = this.state.password;
    
    let authString = sessionStorage.getItem('basicauth');
    const verification = 'Basic ' + window.btoa(sessionStorage.getItem('username') + ':' + pswd)
    if(authString === verification)
    {
      Axios.get(
        "http://localhost:8082/virement/" + this.state.virement.id+"/confirmation",
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
              return this.props.history.push("/listVirement");
            }, 3000);
          } else {
            this.setState({
              show: false,
              type: "",
            });
          }
        }, 200);
      });
  
      this.setState({ virement: this.initialState });
    }
    else {
      alert("Mot de passe incorrect !");
      this.setState({...this.state,
      password: ""})
    }

    
  };

  virementChange = (event) => {
    
     if(event.target.name === "numeroCompte")
     {
      
      this.setState({ ...this.state,
         virement: { ...this.state.virement,
           compte: {
             ...this.state.virement.compte,
             numeroCompte: event.target.value
           }
         }
       });
       
     }
     else if(event.target.name === "beneficiaire")
     {
      
      this.setState({ ...this.state,
         virement: { ...this.state.virement,
           beneficiaire: {
             ...this.state.virement.beneficiaire,
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
         virement: {
           ...this.state.virement,
           [event.target.name]: event.target.value
         }
       });
     }
     
  };

  render() {
    const { show, type, password, see, comptes, beneficiaires } = this.state;


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
            {this.state.virement.id
              ? see
                ? "Signature virement"
                : "Modification virement"
              : "Création virement"}
          </Card.Header>
          <Form
            onSubmit={
              this.state.virement.id
                ? see
                  ? this.signerVirement
                  : this.updateVirement
                : this.submitVirement
            }
            id="virementFormId"
          >
            <Card.Body>
              <Form.Group controlId="formGridNumeroCompte">
                <Form.Label>Numéro compte</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.virement.compte.numeroCompte}
                  onChange={this.virementChange}
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

              <Form.Group controlId="formGridBeneficiaire">
                <Form.Label>Bénéficiaire</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.virement.beneficiaire.numeroCompte}
                  onChange={this.virementChange}
                  required
                  className="bg-dark text-white"
                  name="beneficiaire"
                  disabled={see ? true : false}
                  custom={see ? true : false}
                >
                  {beneficiaires.map((beneficiaire) => (
                    <option key={beneficiaire.value} value={beneficiaire.value}>
                      {beneficiaire.display}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>


              <Form.Group controlId="formGridMotif">
                <Form.Label>Motif</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.virement.motif}
                  onChange={this.virementChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez le motif de votre demande..."
                  className="bg-dark text-white"
                  name="motif"
                  disabled={see ? true : false}
                />
              </Form.Group>

              <Form.Group controlId="formGridMontant">
                <Form.Label>Montant chéquier</Form.Label>
                <Form.Control
                  type="number"
                  step="0.05"
                  min="0"
                  value={this.state.virement.montant}
                  onChange={this.virementChange}
                  autoComplete="off"
                  required
                  placeholder="Saisissez le montant souhaité..."
                  className="bg-dark text-white"
                  name="montant"
                  disabled={see ? true : false}
                />
              </Form.Group>

              <Form.Group controlId="formGridDateExecution">
                <Form.Label>Date d'exécution</Form.Label>
                <Form.Control
                  type="date"
                  value={this.state.virement.dateExecution}
                  onChange={this.virementChange}
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
              {this.state.virement.id ? (
                see ? (
                  this.state.virement.statut === "Signé" ? (
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
                          onChange={this.virementChange}
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

export default Virement;