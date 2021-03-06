import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./demandeChequier.css";
import Axios from "axios";
import NavigationBar from "../shared/NavigationBar";

class ListDemandeChequier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demandeChequiers: [],
      currentPage: 1,
      numberPerPage: 5,
      search: {
        numeroCompte: "",
        dateDebut: "",
        dateFin: "",
        statut: "",
        montantMax: "",
        montantMin: "",
      },
      comptes: [],
    };
  }

  path = window.location.origin;

  componentWillMount() {
    if((sessionStorage.getItem('username') === null)) window.location.reload();
  }
  componentDidMount() {
    
    this.getAllDemandeChequiers();
    
    this.getAllComptes();
  }

  changePage = (event) => {
    let demandeChequiersLength = this.state.demandeChequiers
      .length;
    if (
      (event.target.value > 0) &
      (event.target.value <
        Math.ceil(demandeChequiersLength / this.state.numberPerPage) + 1)
    ) {
      this.setState({
        currentPage: parseInt(event.target.value),
      });
    }
  };

  firstPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: 1,
      });
  };

  prevPage = () => {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
  };

  nextPage = () => {
    let demandeChequiersLength = this.state.demandeChequiers
      .length;
    if (
      this.state.currentPage <
      Math.ceil(demandeChequiersLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
  };

  lastPage = () => {
    let demandeChequiersLength = this.state.demandeChequiers
      .length;
    if (
      this.state.currentPage <
      Math.ceil(demandeChequiersLength / this.state.numberPerPage)
    )
      this.setState({
        currentPage: Math.ceil(
          demandeChequiersLength / this.state.numberPerPage
        ),
      });
  };

  getAllDemandeChequiers = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8083/abonne/"+sessionStorage.getItem('id')+"/demandeChequiers",
    {headers : {authorization : authString}})
    .then((response) => response.data)
    .then((data) => {
      this.setState({
        demandeChequiers : data,
        })
      });
  };

  getAllComptes = () => {
    let authString = sessionStorage.getItem('basicauth');
    Axios.get("http://localhost:8083/abonne/"+sessionStorage.getItem('id')+"/comptes",
    {headers : {authorization : authString}})
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          comptes: data.map((compte) => {
            return {
              value: compte.numeroCompte,
              display: compte.numeroCompte,
            };
          }),
        });
      });
  };

  // searchChange = (event) => {
  //   this.getAllDemandeChequiers();
  //   this.setState({
  //     search: {
  //       [event.target.name]: event.target.value,
  //     },
  //   });

  //   const search = {
  //     numeroCompte: this.state.search.numeroCompte,
  //     dateDebut: this.state.search.dateDebut,
  //     dateFin: this.state.search.dateFin,
  //     statut: this.state.search.statut,
  //     montantMax: this.state.search.montantMax,
  //     montantMin: this.state.search.montantMin,
  //   };

  //   var result = [];
  //   if (search.numeroCompte != "") {
  //     console.log(search.numeroCompte);
  //     // this.state.demandeChequiers.map((demande) => {
  //     //   const found = demande.compte.numeroCompte;
  //     // if (found.includes(search.numeroCompte)) result.concat(demande);
  //     // console.log(result);
  //     //});
  //   }
  // };

  render() {
    
    const { currentPage, numberPerPage, search, comptes, demandeChequiers } = this.state;
    const lastIndex = currentPage * numberPerPage;
    const firstIndex = lastIndex - numberPerPage;
    const currentList = demandeChequiers.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(demandeChequiers.length / numberPerPage);

    return (
      <div>
        <NavigationBar />
      <Container>
        <Row>
          <Col lg="12" style={{marginTop: '25px'}}>

          <br></br>
        <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
                        <Link
                          to={{
                            pathname: "addDemandeChequier",
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-info"
                          
                          
                        >
                          <img
                            src={this.path+"/images/add-white.png"}
                            width="20"
                            style={{ marginRight: "10px" }}
                            alt="Add"
                          />
                           Nouvelle demande chéquier
                        </Link>
          </ButtonGroup>
        <br></br>
        <br></br>

          <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste des demandes chéquiers</Card.Header>
        <Card.Body>
          
          <Table striped bordered hover responsive variant="dark">
            <thead>
              <tr>
                <th>Numéro compte</th>
                <th>Motif</th>
                <th>Date d'exécution</th>
                <th>Montant chèque</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandeChequiers.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">Aucune demande chéquier effectuée.</td>
                </tr>
              ) : (
                currentList.map((demandeChequier) => (
                  <tr key={demandeChequier.id}>
                    <td>{demandeChequier.compte.numeroCompte}</td>
                    <td>{demandeChequier.motif}</td>
                    <td>{demandeChequier.dateExecution}</td>
                    <td>{demandeChequier.montantChequier}</td>
                    <td>{demandeChequier.statut}</td>
                    <td align="center">
                      <ButtonGroup>
                        <Link
                          to={{
                            pathname: "seeDemandeChequier/" + demandeChequier.id,
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-primary"
                          style={{ marginRight: "25px" }}
                        >
                          <img
                            src={this.path+"/images/see.png"}
                            width="20"
                            alt="See"
                          />
                        </Link>

                        {demandeChequier.statut === "Enregistrée" ? (
                          <Link
                            to={{
                              pathname: "editDemandeChequier/" + demandeChequier.id,
                              state: { fromDashboard: true },
                            }}
                            className="btn btn-danger"
                          >
                            <img
                              src={this.path+"/images/edit.png"}
                              width="20"
                              alt="Edit"
                            />
                          </Link>
                        ) : (
                          <Button disabled variant="danger">
                            <img
                              src={this.path+"/images/edit.png"}
                              width="20"
                              alt="Edit"
                            />
                          </Button>
                        )}
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer>
          <div style={{ float: "left" }}>
            Page {currentPage} de {totalPages}
          </div>

          <div style={{ float: "right" }}>
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.firstPage}
                >
                  <img
                    src={this.path+"/images/first.png"}
                    width="20"
                    alt="first"
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === 1 ? true : false}
                  onClick={this.prevPage}
                >
                  <img
                    src={this.path+"/images/prev.png"}
                    width="20"
                    alt="prev"
                  />
                </Button>
              </InputGroup.Prepend>

              <FormControl
                className={" bg-dark page-num"}
                name="currentPage"
                value={currentPage}
                onChange={this.changePage}
                type="text"
                pattern="[0-9]+"
              />

              <InputGroup.Append>
                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.nextPage}
                >
                  <img
                    src={this.path+"/images/next.png"}
                    width="20"
                    alt="next"
                  />
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages ? true : false}
                  onClick={this.lastPage}
                >
                  <img
                    src={this.path+"/images/last.png"}
                    width="20"
                    alt="last"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
          </Col>
          </Row>
          </Container>
          </div>
      
    );
  }
}

export default ListDemandeChequier;
