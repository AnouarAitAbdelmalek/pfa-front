import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  FormControl,
  InputGroup,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./demandeChequier.css";
import Axios from "axios";

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
    Axios.get("http://localhost:8082/demandeChequier/abonne/1/demandeChequiers")
    .then((response) => response.data)
    .then((data) => {
      this.setState({
        demandeChequiers : data,
        })
      });
  };

  getAllComptes = () => {
    Axios.get("http://localhost:8082/demandeChequier/abonne/1/comptes")
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
      <Card className="border border-dark bg-dark text-white">
        <Card.Header>Liste des demandes chéquiers</Card.Header>
        <Card.Body>
          {/* <Form id="searchFormId">
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNumeroCompte">
                <Form.Control
                  size="sm"
                  as="select"
                  value={search.numeroCompte}
                  onChange={this.searchChange}
                  className="bg-dark text-white"
                  name="numeroCompte"
                >
                  <option key="" value="">
                    Numéro compte
                  </option>
                  {comptes.map((compte) => (
                    <option key={compte.value} value={compte.value}>
                      {compte.display}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStatut">
                <Form.Control
                  size="sm"
                  as="select"
                  value={search.statut}
                  onChange={this.searchChange}
                  className="bg-dark text-white"
                  name="statut"
                >
                  <option key="" value="">
                    Statut
                  </option>
                  <option key="Enregistrée" value="Enregistrée">
                    Enregistrée
                  </option>
                  <option key="Signée" value="Signée">
                    Signée
                  </option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDateDebut">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Date fin"
                  onFocus={(event) => {
                    event.target.type = "date";
                  }}
                  onBlur={(event) => {
                    event.target.type = "text";
                  }}
                  value={search.dateDebut}
                  onChange={this.searchChange}
                  className="bg-dark text-white"
                  name="dateDebut"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDateFin">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Date fin"
                  onFocus={(event) => {
                    event.target.type = "date";
                  }}
                  onBlur={(event) => {
                    event.target.type = "text";
                  }}
                  value={search.dateFin}
                  onChange={this.searchChange}
                  className="bg-dark text-white"
                  name="dateFin"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridMontantMin">
                <Form.Control
                  size="sm"
                  type="number"
                  step="0.05"
                  min="0"
                  placeholder="Montant Min"
                  value={search.montantMin}
                  onChange={this.searchChange}
                  autoComplete="off"
                  className="bg-dark text-white"
                  name="montantMin"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridMontantMax">
                <Form.Control
                  size="sm"
                  type="number"
                  step="0.05"
                  min="0"
                  placeholder="Montant Max"
                  value={search.montantMax}
                  onChange={this.searchChange}
                  autoComplete="off"
                  className="bg-dark text-white"
                  name="montantMax"
                />
              </Form.Group>
            </Form.Row>
          </Form> */}
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
                            pathname: "see/" + demandeChequier.id,
                            state: { fromDashboard: true },
                          }}
                          className="btn btn-primary"
                          style={{ marginRight: "25px" }}
                        >
                          <img
                            src="%PUBLIC_URL%/../images/see.png"
                            width="20"
                            alt="See"
                          />
                        </Link>

                        {demandeChequier.statut === "Enregistrée" ? (
                          <Link
                            to={{
                              pathname: "edit/" + demandeChequier.id,
                              state: { fromDashboard: true },
                            }}
                            className="btn btn-danger"
                          >
                            <img
                              src="%PUBLIC_URL%/../images/edit.png"
                              width="20"
                              alt="Edit"
                            />
                          </Link>
                        ) : (
                          <Button disabled variant="danger">
                            <img
                              src="%PUBLIC_URL%/../images/edit.png"
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
                    src="%PUBLIC_URL%/../images/first.png"
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
                    src="%PUBLIC_URL%/../images/prev.png"
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
                    src="%PUBLIC_URL%/../images/next.png"
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
                    src="%PUBLIC_URL%/../images/last.png"
                    width="20"
                    alt="last"
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

export default ListDemandeChequier;
